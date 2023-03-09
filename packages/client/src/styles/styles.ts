import styled from 'styled-components';

export const SPage = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
`;

export const SCard = styled.div`
    width: 200px;
    height: 300px;
    padding: 20px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    background: grey;
`;

export const SCard_Selected = styled.div`
    width: 200px;
    height: 300px;
    padding: 20px;
    display: flex;
    box-shadow: '0px 0px 30px 0px rgba(45,255,196,0.4)';
    justify-content: center;
    border-radius: 10px;
    background: grey;
`;
