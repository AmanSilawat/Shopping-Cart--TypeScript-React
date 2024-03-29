import { useState } from 'react';
import { useQuery } from 'react-query';

// components
import Item from './Item/Item';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

// styles
import { Wrapper } from './App.styles';
import { StyledButton } from './App.styles';
import Cart from './Cart/Cart';

// types
export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

// ..
const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, error } = useQuery<CartItemType[]>(
		'products',
		getProducts
	);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((acc: number, item) => acc + item.amount, 0);

	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems(prev => {
			const isItemInCart = prev.find(item => item.id === clickedItem.id);

			// is the item already exist in the cart
			if (isItemInCart) {
				return prev.map(item =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}

			// first time item is added
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems(prev =>
			prev.reduce((acc, item) => {
				if (item.id === id) {
					if (item.amount === 1) return acc;
					return [...acc, { ...item, amount: item.amount - 1 }];
				} else {
					return [...acc, item];
				}
			}, [] as CartItemType[])
		);
	};

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong...</div>;

	return (
		<Wrapper>
			<header>
				<StyledButton onClick={() => setCartOpen(true)}>
					<Badge
						badgeContent={getTotalItems(cartItems)}
						color='error'>
						<AddShoppingCart />
					</Badge>
				</StyledButton>
			</header>

			<Drawer
				anchor='right'
				open={cartOpen}
				onClose={() => setCartOpen(false)}>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
				/>
			</Drawer>

			<Grid container spacing={3}>
				{data?.map(item => (
					<Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
						<Item
							item={item}
							handleAddToCart={handleAddToCart}></Item>
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
