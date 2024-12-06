import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
const App = () => {
    // Food data (for example)
   
    const foodItems = [
        { id: '1', name: 'Plain Pizza', price: 89 },
        { id: '2', name: 'Capsicum Pizza', price: 99 },
        { id: '3', name: 'Cheese Pizza', price: 99 },
        { id: '4', name: 'Corn Pizza', price: 109 },
        // Add more items as needed
    ];
    const [paidAmount, setPaidAmount] = useState(0);
    const totalAmount = 1000;

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load cart data from AsyncStorage on component mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart');
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    setCart(parsedCart);
                    calculateTotal(parsedCart);
                }
            } catch (error) {
                console.error('Error loading cart from AsyncStorage:', error);
            }
        };

        loadCart();
    }, []);

    // Calculate total price
    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    // Add item to cart
    const addToCart = async (food) => {
        const existingItemIndex = cart.findIndex((item) => item.id === food.id);

        let updatedCart = [...cart];

        if (existingItemIndex === -1) {
            updatedCart.push({ ...food, quantity: 1 });
        } else {
            updatedCart[existingItemIndex].quantity += 1;
        }

        setCart(updatedCart);
        calculateTotal(updatedCart);

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart to AsyncStorage:', error);
        }
    };

    // Remove item from cart
    const removeFromCart = async (food) => {
        const updatedCart = cart.filter((item) => item.id !== food.id);
        setCart(updatedCart);
        calculateTotal(updatedCart);

        try {
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart to AsyncStorage:', error);
        }
    };

    // Decrement item quantity in the cart
    const decrementQuantity = async (food) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item.id === food.id);

        if (itemIndex !== -1 && updatedCart[itemIndex].quantity > 1) {
            updatedCart[itemIndex].quantity -= 1;
            setCart(updatedCart);
            calculateTotal(updatedCart);
        } else if (updatedCart[itemIndex].quantity === 1) {
            removeFromCart(food);
        }

        try {
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart to AsyncStorage:', error);
        }
    };

    // Increment item quantity in the cart
    const incrementQuantity = async (food) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((item) => item.id === food.id);

        if (itemIndex !== -1) {
            updatedCart[itemIndex].quantity += 1;
            setCart(updatedCart);
            calculateTotal(updatedCart);
        }

        try {
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart to AsyncStorage:', error);
        }
    };
    const navigation=useNavigation();
    const handlePaid = () => {
        setPaidAmount(totalAmount); // Mark the amount as paid
        navigation.navigate('DuePage', { amount: totalAmount - paidAmount });
    };

    const handleDue = () => {
        navigation.navigate('DuePage', { amount: totalAmount });
    };

    return (

        <View style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}> <Icon name='book' size={20} />
                <Text style={{ fontSize: 24, marginBottom: 15, marginTop: 20, paddingHorizontal: 5 }}>Menu</Text></View>
            <FlatList
                data={foodItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <Text style={{ flex: 1 }}>{item.name}</Text>
                        <Text style={{ marginRight: 10 }}> ₹{item.price}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)}>
                            <Text style={{ color: 'blue' }}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: -5, alignItems: 'flex-start' }}><AntDesign name="shoppingcart" size={25} /></View>
                <Text style={{ fontSize: 25, marginTop: -30, marginLeft: 25, marginBottom: 10 }}>Cart</Text>
                {cart.length > 0 ? (
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ flex: 1, }}>
                                    {item.name} (x{item.quantity})
                                </Text>
                                <Text style={{ marginRight: 30, fontSize: 15, }}>₹{item.price * item.quantity}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', marginVertical: -10 }} onPress={() => incrementQuantity(item)}>
                                    <Text style={{ color: 'green', fontSize: 25, }}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={() => removeFromCart(item)}>
                                    <AntDesign name="delete" size={18} />
                                    <TouchableOpacity style={{ marginVertical: -15 }} onPress={() => decrementQuantity(item)}>
                                        <Text style={{ color: 'red', fontSize: 35, marginLeft: 10 }}>-</Text>
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <Text>Your cart is empty</Text>
                )}
                <Text style={{ fontSize: 20, marginTop: 10 }}>Total: ₹{totalPrice}</Text>


            </View>
            return (
            <View style={styles.container}>
                <Text style={styles.header}>Payment Status</Text>
               <View style={{flexDirection:'row',marginLeft:10}}> <Button title="Paid" onPress={handlePaid} />
                <Button title="Due" onPress={handleDue} /></View>
                {paidAmount === totalAmount && (
                    <Text style={styles.message}>The amount has been paid successfully!</Text>
                )}
            </View>
            );
        </View>
    );
};
const DuePage = ({ route }) => {
  const { amount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Due Amount</Text>
      <Text style={styles.amount}>Due Amount: {amount}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        

    },
    header: {
        fontSize: 24,
        marginBottom: 20,
       
    },
    message: {
        marginTop: 20,
        color: 'green',
        fontSize: 18,
    },
    amount: {
        fontSize: 20,
        marginTop: 20,
    },
});

export default App;