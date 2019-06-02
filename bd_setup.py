import psycopg2

class Database:
    def __init__(self):
        print("Open DB Connection")
        self.cnx = psycopg2.connect(host='127.0.0.1', database='jornal',
                                    user='paulo', password='1234*', port=5432)        

    def check_conection(self):
        return self.cnx.closed

    def get_cursor(self):
        cur = self.cnx.cursor()
        print("Return Cursor")
        return cur

    def close_connection(self):
        self.cnx.commit()
        self.cnx.close()
        print("Close connection")

def drop_table(cur):
    sql_command = """DROP TABLE IF EXISTS COMENTARIO;
                    DROP TABLE IF EXISTS EQUIPAMENTO_UTILIZADO;
                    DROP TABLE IF EXISTS PARTICIPA;
                    DROP TABLE IF EXISTS VIDEO;
                    DROP TABLE IF EXISTS EQUIPAMENTO;
                    DROP TABLE IF EXISTS SALA_EQUIPAMENTOS;
                    DROP TABLE IF EXISTS MATERIA_FINAL;
                    DROP TABLE IF EXISTS EPISODIO;
                    DROP TABLE IF EXISTS SALA_EDICAO;
                    DROP TABLE IF EXISTS LOCAL;
                    DROP TABLE IF EXISTS APROVACAO;
                    DROP TABLE IF EXISTS MATERIA;
                    DROP TABLE IF EXISTS LINK;
                    DROP TABLE IF EXISTS PAUTA;
                    DROP TABLE IF EXISTS CARGO_PARTICIPANTE;
                    DROP TABLE IF EXISTS PARTICIPANTE;
                    DROP TABLE IF EXISTS PRODUTOR;
                    DROP TABLE IF EXISTS JORNALISTA;
                    DROP TABLE IF EXISTS EDITOR;
                    DROP TABLE IF EXISTS PESQUISADOR;
                    DROP TABLE IF EXISTS PESSOA;"""
    cur.execute(sql_command)

def create_table(cur):
    print("Creating tables")
    sql_command = """
                    CREATE TABLE PESSOA (
                        CPF CHAR(11),
                        NOME VARCHAR(20) NOT NULL,
                        TEL BIGINT,

                        CONSTRAINT PK_PESSOA
                            PRIMARY KEY (CPF)
                    );

                    CREATE TABLE PESQUISADOR (
                        CPF CHAR(11),

                        CONSTRAINT PK_PESQUISADOR
                            PRIMARY KEY (CPF),
                        CONSTRAINT FK_PESQUISADOR
                            FOREIGN KEY (CPF)
                            REFERENCES PESSOA (CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE EDITOR (
                        CPF CHAR(11),

                        CONSTRAINT PK_EDITOR
                            PRIMARY KEY (CPF),
                        CONSTRAINT FK_EDITOR
                            FOREIGN KEY (CPF)
                            REFERENCES PESSOA (CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE JORNALISTA (
                        CPF CHAR(11),

                        CONSTRAINT PK_JORNALISTA
                            PRIMARY KEY (CPF),
                        CONSTRAINT FK_JORNALISTA
                            FOREIGN KEY (CPF)
                            REFERENCES PESSOA (CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE PRODUTOR (
                        CPF CHAR(11),

                        CONSTRAINT PK_PRODUTOR
                            PRIMARY KEY (CPF),
                        CONSTRAINT FK_PRODUTOR
                            FOREIGN KEY (CPF)
                            REFERENCES PESSOA (CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE PARTICIPANTE (
                        CPF CHAR(11),

                        CONSTRAINT PK_PARTICIPANTE
                            PRIMARY KEY (CPF),
                        CONSTRAINT FK_PARTICIPANTE
                            FOREIGN KEY (CPF)
                            REFERENCES PESSOA(CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE CARGO_PARTICIPANTE (
                        CARGO VARCHAR(20) NOT NULL,
                        PESSOA CHAR(11) NOT NULL,

                        CONSTRAINT PK_CARGO_PARTICIPANTE
                            PRIMARY KEY (CARGO, PESSOA),
                        CONSTRAINT FK_CARGO_PARTICIPANTE
                            FOREIGN KEY (PESSOA)
                            REFERENCES PARTICIPANTE(CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE PAUTA (
                        TITULO VARCHAR(100),
                        PESQUISADOR CHAR(11) NOT NULL DEFAULT 'INATIVO',
                        DATA_INCLUSAO DATE default now(),
                        RESUMO TEXT,

                        CONSTRAINT PK_PAUTA
                            PRIMARY KEY (TITULO),
                        CONSTRAINT FK_PAUTA
                            FOREIGN KEY (PESQUISADOR)
                            REFERENCES PESQUISADOR(CPF)
                            ON DELETE SET DEFAULT
                    );

                    CREATE TABLE LINK (
                        PAUTA VARCHAR(100),
                        LINK VARCHAR(200),

                        CONSTRAINT PK_LINK
                            PRIMARY KEY(PAUTA, LINK),
                        CONSTRAINT FK_LINK
                            FOREIGN KEY (PAUTA)
                            REFERENCES PAUTA(TITULO)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE MATERIA (
                        TITULO VARCHAR(100),
                        JORNALISTA CHAR(11) NOT NULL DEFAULT 'INATIVO',
                        DATA_INCLUSAO DATE default now(),
                        TEXTO TEXT,

                        CONSTRAINT PK_MATERIA
                            PRIMARY KEY (TITULO),
                        CONSTRAINT FK_MATERIA_PAUTA
                            FOREIGN KEY (TITULO)
                            REFERENCES PAUTA(TITULO)
                            ON DELETE CASCADE,
                        CONSTRAINT FK_MATERIA_JORNALISTA
                            FOREIGN KEY (JORNALISTA)
                            REFERENCES JORNALISTA(CPF)
                            ON DELETE SET DEFAULT
                    );

                    CREATE TABLE APROVACAO (
                        MATERIA VARCHAR(100),
                        PRODUTOR_APROVADOR CHAR(11),

                        CONSTRAINT PK_APROVACAO
                            PRIMARY KEY(MATERIA),
                        CONSTRAINT FK_APROVACAO_MATERIA
                            FOREIGN KEY (MATERIA)
                            REFERENCES MATERIA(TITULO)
                            ON DELETE CASCADE,
                        CONSTRAINT FK_APROVACAO_PRODUTOR
                            FOREIGN KEY (PRODUTOR_APROVADOR)
                            REFERENCES PRODUTOR(CPF)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE LOCAL (
                        ID SERIAL,
                        LOGRADOURO VARCHAR(100) NOT NULL,
                        NUMERO_RUA INTEGER NOT NULL,
                        CEP CHAR(8) NOT NULL,
                        CIDADE VARCHAR(20),
                        ESTADO CHAR(2),
                        BLOCO INTEGER DEFAULT -1,
                        ANDAR INTEGER DEFAULT -1,
                        NUMERO_SALA INTEGER DEFAULT -1,

                        CONSTRAINT PK_LOCAL
                            PRIMARY KEY (ID)
                    );

                    CREATE TABLE SALA_EDICAO (
                        BLOCO INTEGER,
                        ANDAR INTEGER,
                        NUMERO INTEGER,

                        CONSTRAINT PK_SALA_EDICAO
                            PRIMARY KEY (BLOCO, ANDAR, NUMERO)
                    );

                    CREATE TABLE EPISODIO (
                        DATA DATE,
                        PRODUTOR CHAR(11) DEFAULT 'INATIVO',

                        CONSTRAINT PK_EPISODIO
                            PRIMARY KEY(DATA),
                        CONSTRAINT FK_EPISODIO
                            FOREIGN KEY (PRODUTOR)
                            REFERENCES PRODUTOR (CPF)
                            ON DELETE SET DEFAULT
                    );

                    CREATE TABLE MATERIA_FINAL (
                        VIDEO_FINAL VARCHAR(50),
                        EDITOR CHAR(11) NOT NULL DEFAULT 'INATIVO',
                        BLOCO INTEGER NOT NULL DEFAULT -1, -- NOJENTO HEUHEU
                        ANDAR INTEGER NOT NULL DEFAULT -1,
                        NUMERO INTEGER NOT NULL DEFAULT -1,
                        DATA TIMESTAMP NOT NULL,
                        PERIODO INTERVAL NOT NULL,
                        EPISODIO DATE,

                        CONSTRAINT PK_MATERIA_FINAL
                            PRIMARY KEY (VIDEO_FINAL),
                        CONSTRAINT FK_MATERIA_FINAL_EDITOR
                            FOREIGN KEY (EDITOR)
                            REFERENCES EDITOR(CPF)
                            ON DELETE SET DEFAULT,
                        CONSTRAINT FK_MATERIA_FINAL_SALA_EDICAO
                            FOREIGN KEY (BLOCO, ANDAR, NUMERO)
                            REFERENCES SALA_EDICAO (BLOCO, ANDAR, NUMERO)
                            ON DELETE SET DEFAULT,
                        CONSTRAINT SK_MATERIA_FINAL
                            UNIQUE (EDITOR, BLOCO, ANDAR, NUMERO, DATA),
                        CONSTRAINT FK_MATERIA_FINAL_EPISODIO
                            FOREIGN KEY (EPISODIO)
                            REFERENCES EPISODIO (DATA)
                            ON DELETE SET NULL
                    );


                    CREATE TABLE SALA_EQUIPAMENTOS (
                        BLOCO INTEGER,
                        ANDAR INTEGER,
                        NUMERO INTEGER,

                        CONSTRAINT PK_SALA_EQUIPAMENTOS
                            PRIMARY KEY (BLOCO, ANDAR, NUMERO)
                    );

                    CREATE TABLE EQUIPAMENTO (
                        NPATRIMONIO SERIAL,
                        TIPO CHAR(10),
                        ANO INTEGER,
                        MARCA VARCHAR(20),
                        BLOCO INTEGER,
                        ANDAR INTEGER,
                        NUMERO INTEGER,

                        CONSTRAINT PK_EQUIPAMENTO
                            PRIMARY KEY (NPATRIMONIO),
                        CONSTRAINT FK_EQUIPAMENTO_SALA_EQUIPAMENTO
                            FOREIGN KEY (BLOCO, ANDAR, NUMERO)
                            REFERENCES SALA_EQUIPAMENTOS(BLOCO, ANDAR, NUMERO)
                            ON DELETE SET NULL
                    );


                    CREATE TABLE VIDEO (
                        MATERIA VARCHAR(100),
                        ARQUIVO VARCHAR(50), -- LINK DO VIDEO ARMAZENADO LOCALMENTE 
                        LOCAL INTEGER,
                        MATERIA_FINAL VARCHAR(50),
                        DURACAO INTERVAL,

                        CONSTRAINT PK_VIDEO
                            PRIMARY KEY(MATERIA, ARQUIVO),
                        CONSTRAINT FK_VIDEO_LOCAL
                            FOREIGN KEY (LOCAL)
                            REFERENCES LOCAL(ID)
                            ON DELETE SET NULL,
                        CONSTRAINT FK_VIDEO_MATERIA_FINAL
                            FOREIGN KEY (MATERIA_FINAL)
                            REFERENCES MATERIA_FINAL(VIDEO_FINAL)
                            ON DELETE SET NULL,
                        CONSTRAINT FK_VIDEO_MATERIA 
                            FOREIGN KEY (MATERIA)
                            REFERENCES APROVACAO(MATERIA)
                            ON DELETE SET NULL
                    );

                    CREATE TABLE PARTICIPA (
                        MATERIA VARCHAR(100),
                        ARQUIVO VARCHAR(50),
                        CARGO VARCHAR(20),
                        PESSOA CHAR(11),

                        CONSTRAINT PK_PARTICIPA
                            PRIMARY KEY (MATERIA, ARQUIVO, CARGO, PESSOA),
                        CONSTRAINT FK_PARTICIPA
                            FOREIGN KEY (MATERIA, ARQUIVO)
                            REFERENCES VIDEO (MATERIA, ARQUIVO)
                            ON DELETE CASCADE,
                        CONSTRAINT FK2_PARTICIPA
                            FOREIGN KEY (CARGO, PESSOA)
                            REFERENCES CARGO_PARTICIPANTE (CARGO, PESSOA)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE EQUIPAMENTO_UTILIZADO(
                        MATERIA VARCHAR(100),
                        ARQUIVO VARCHAR(50),
                        EQUIPAMENTO INTEGER,

                        CONSTRAINT PK_EQUIPAMENTO_UTILIZADO
                            PRIMARY KEY (MATERIA, ARQUIVO, EQUIPAMENTO),
                        CONSTRAINT FK_EQUIPAMENTO_UTILIZADO_VIDEO
                            FOREIGN KEY (MATERIA, ARQUIVO)
                            REFERENCES VIDEO(MATERIA, ARQUIVO)
                            ON DELETE CASCADE,
                        CONSTRAINT FK_EQUIPAMENTO_UTILIZADO_EQUIPAMENTO
                            FOREIGN KEY (EQUIPAMENTO)
                            REFERENCES EQUIPAMENTO(NPATRIMONIO)
                            ON DELETE CASCADE
                    );

                    CREATE TABLE COMENTARIO(
                        MATERIA VARCHAR(100),
                        PRODUTOR CHAR(11),
                        DATA TIMESTAMP,
                        TEXTO TEXT,

                        CONSTRAINT PK_COMENTARIO
                            PRIMARY KEY (MATERIA, PRODUTOR, DATA),
                        CONSTRAINT FK_COMENTARIO_PRODUTOR
                            FOREIGN KEY (PRODUTOR)
                            REFERENCES PRODUTOR(CPF)
                            ON DELETE CASCADE
                    );
                    """
    cur.execute(sql_command)

def populate_table(cur):
    pessoas = "('111', 'paulo', 11992915560), ('222', 'fabio', '1111111'), ('223', 'douglas', 222222), ('333', 'clayton', 333333), ('334', 'mauricio', 3333)"
    sql_command = "insert into PESSOA (CPF, NOME, TEL) values %s;" % pessoas
    cur.execute(sql_command)

    pesquisador = "('111'), ('222')"
    sql_command = "insert into PESQUISADOR (CPF) values %s" % pesquisador
    cur.execute(sql_command)

    editor = "('111'), ('223')"
    sql_command = "insert into EDITOR (CPF) values %s" % editor
    cur.execute(sql_command)

    jornalista = "('111'), ('223')"
    sql_command = "insert into JORNALISTA (CPF) values %s" % jornalista
    cur.execute(sql_command)

    produtor = "('222'), ('223')"
    sql_command = "insert into PRODUTOR (CPF) values %s" % produtor
    cur.execute(sql_command)

    participante = "('333'), ('334')"
    sql_command = "insert into PARTICIPANTE (CPF) values %s" % participante
    cur.execute(sql_command)

    cargo_participante = "('testemunha','333'), ('especialista', '334')"
    sql_command = "insert into CARGO_PARTICIPANTE (CARGO, PESSOA) values %s" % cargo_participante
    cur.execute(sql_command)

    pauta = "('titulo1','111','resumo1'), ('titulo2','111','resumo2'), ('titulo3', '222', 'resumo3')"
    sql_command = "insert into PAUTA (TITULO, PESQUISADOR, RESUMO) values %s" % pauta
    cur.execute(sql_command)

    link = "('titulo1', 'link1'), ('titulo1', 'link2'), ('titulo2', 'link3')"
    sql_command = "insert into LINK (PAUTA, LINK) values %s" % link
    cur.execute(sql_command)

    materia = "('titulo1', '111', 'texto1'), ('titulo2', '223', 'text2')"
    sql_command = "insert into MATERIA (TITULO, JORNALISTA, TEXTO) values %s" % materia
    cur.execute(sql_command)

    aprovacao = "('titulo1', '222'), ('titulo2', '222')"
    sql_command = "insert into APROVACAO (MATERIA, PRODUTOR_APROVADOR) values %s" % aprovacao
    cur.execute(sql_command)    

    local = "('rua1', 1, 'cep1','sao paulo', 'sp', 1, 1, 1), ('rua1', 1, 'cep1', 'sao paulo', 'sp',2, 2, 2)"
    sql_command = "insert into LOCAL (LOGRADOURO, NUMERO_RUA, CEP, CIDADE, ESTADO, BLOCO, ANDAR, NUMERO_SALA) values %s" % local
    cur.execute(sql_command)
    local = "('rua2', 256, 'cep2', 'sao carlos', 'sp')"
    sql_command = "insert into LOCAL (LOGRADOURO, NUMERO_RUA, CEP, CIDADE, ESTADO) values %s" % local
    cur.execute(sql_command)

    sala_edicao = "(1,1,1), (1,1,2), (2,1,1), (1,3,1)"
    sql_command = "insert into SALA_EDICAO (BLOCO, ANDAR, NUMERO) values %s" %  sala_edicao
    cur.execute(sql_command)

    episodio = "('2020-01-01', '222'), ('2019-03-12', '223')"
    sql_command = "insert into EPISODIO (DATA, PRODUTOR) values %s" % episodio
    cur.execute(sql_command)

    materia_final = "('video1', '111', 1, 1, 1, '2019-01-01', '50 minutes', '2020-01-01'), ('video2', '223', 1,1,1, '2019-01-01', '2 hours', '2020-01-01')"
    sql_command = "insert into MATERIA_FINAL (VIDEO_FINAL, EDITOR, BLOCO, ANDAR, NUMERO, DATA, PERIODO, EPISODIO) values %s" % materia_final
    cur.execute(sql_command)

    sala_equipamentos = "(3,2,1), (3,2,2), (3,3,3)"
    sql_command = "insert into SALA_EQUIPAMENTOS (BLOCO, ANDAR, NUMERO) values %s" % sala_equipamentos
    cur.execute(sql_command)

    equipamentos = "('microfone', 2015, 'Shure', 3,2,1), ('camera',2018, 'canon', 3,2,1)"
    sql_command = "insert into EQUIPAMENTO (TIPO, ANO, MARCA, BLOCO, ANDAR, NUMERO) values %s" % equipamentos
    cur.execute(sql_command)

    video = "('titulo1', 'arquivo1', 1, 'video1', '50 minutes'), ('titulo1', 'arquivo2', 1, 'video2', '2 hours')"
    sql_command = "insert into VIDEO (MATERIA, ARQUIVO, LOCAL, MATERIA_FINAL, DURACAO) values %s" % video
    cur.execute(sql_command)

    participa = "('titulo1','arquivo1', 'testemunha',  '333'), ('titulo1', 'arquivo1', 'especialista', '334')"
    sql_command = "insert into PARTICIPA (MATERIA, ARQUIVO, CARGO, PESSOA) values %s" % participa
    cur.execute(sql_command)

    equipamento_utilizado = "('titulo1', 'arquivo1', 1), ('titulo1', 'arquivo1', 2)"
    sql_command = "insert into EQUIPAMENTO_UTILIZADO (MATERIA, ARQUIVO, EQUIPAMENTO) values %s" % equipamento_utilizado
    cur.execute(sql_command)

    # comentario = "('materia',), ()"
    # sql_command = "insert into COMENTARIO (MATERIA, PRODUTOR, DATA, TEXTO) values %s" % comentario
    # cur.execute(sql_command)

if __name__ == "__main__":
    db = Database()
    cur = db.get_cursor()
    drop_table(cur)
    create_table(cur)

    populate_table(cur)

    db.close_connection()