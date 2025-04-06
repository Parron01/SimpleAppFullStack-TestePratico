import styled from "styled-components";

export const TransactionsTableContainer = styled.div`
  max-width: 54rem;
  margin: 3rem auto 0;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-spacing: 0 0.5rem;
  border: 1px solid ${(props) => props.theme["gray-700"]};
  border-radius: 0.5rem;
  padding: 1rem;

  th {
    color: ${(props) => props.theme.white};
    font-weight: 400;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    text-align: left;

    & + th {
      border-left: 1px solid ${(props) => props.theme["gray-600"]};
    }

    .senderIcon {
      color: ${(props) => props.theme["red-500"]};
    }
    .receiverIcon,
    .valueIcon {
      color: ${(props) => props.theme["green-300"]};
    }
  }

  td {
    padding: 1rem 2rem;
    background: ${(props) => props.theme["gray-800"]};

    &:first-child {
      color: ${(props) => props.theme.white};
    }

    &:last-child {
      width: 1.5rem;
      border-left: 0.6rem solid transparent;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["red-700"]};

      .icon {
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: ${(props) => props.theme["red-500"]};
        }
      }
    }
  }

  &.my-transactions-table td:last-child {
    border-left: none;
    background: ${(props) => props.theme["gray-800"]};
    color: inherit;
  }
`;