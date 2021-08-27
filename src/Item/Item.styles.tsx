import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	border: 1px solid #3f9e8c59;
	border-radius: 20px;
	height: 100%;

	button {
		border-radius: 0 0 20px 20px;
		border-top: 1px solid #3f9e8c59;
	}

	button:hover {
		background-color: #3e9e8c;
		color: #fff;
	}
	img {
		max-height: 250px;
		object-fit: cover;
		border-radius: 20px 20px 0 0;
	}

	div {
		font-family: Arial, Helvetica, sans-serif;
		padding: 1rem;
		height: 100%;
	}
`;
