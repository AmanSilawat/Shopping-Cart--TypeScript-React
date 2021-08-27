import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
	margin: 100px 50px 50px;

	header {
		background-color: #3e9e8c;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 5px 40px 0;
		text-align: right;
		box-sizing: border-box;
		z-index: 10;
	}
`;

export const StyledButton = styled(IconButton)``;
