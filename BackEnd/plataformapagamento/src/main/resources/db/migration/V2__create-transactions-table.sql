CREATE TABLE transactions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    amount NUMERIC(19, 2) NOT NULL,
    sender_id BIGINT REFERENCES users(id),
    receiver_id BIGINT REFERENCES users(id),
    timestamp TIMESTAMP NOT NULL
);
