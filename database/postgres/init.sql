CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    treinador VARCHAR NOT NULL,
    tipo VARCHAR NOT NULL,
    nivel INTEGER NOT NULL DEFAULT 1,
    situacao BOOLEAN DEFAULT TRUE
);

INSERT INTO pokemon (treinador, tipo, nivel) VALUES
('João Silva', 'Pikachu', 1),
('Maria Souza', 'charizard', 1),
('Carlos Lima', 'mewtwo', 1),
('Ana Paula', 'Pikachu', 1),
('Fernanda Rocha', 'mewtwo', 1),
('Eduardo Santos', 'charizard', 1),
('Juliana Melo', 'Pikachu', 1),
('Ricardo Borges', 'mewtwo', 1),
('Larissa Costa', 'charizard', 1),
('Thiago Alves', 'Pikachu', 1);