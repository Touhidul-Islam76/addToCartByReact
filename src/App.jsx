import { useState, useEffect } from 'react';
import burger from '../src/assets/burger.jpeg'
import coffee from '../src/assets/coffee.jpeg'
import drinks from '../src/assets/drink.jpeg'
import french from '../src/assets/french.jpeg'
import milkshake from '../src/assets/milkshake.jpeg'
import nuggets from '../src/assets/nuggets.jpeg'
import pizza from '../src/assets/pizza.jpeg'
import salad from '../src/assets/salad.jpeg'
import { ImExit } from "react-icons/im";
import { FaBars,FaSearch,FaShoppingCart,FaPlusSquare  } from "react-icons/fa";
import { FaBowlFood ,  } from "react-icons/fa6";
import Notification from '../src/Notification';
function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showNotification, setShowNotification] = useState(false); // নোটিফিকেশন স্টেট

  // কার্টে আইটেম যোগ করার ফাংশন
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // কার্ট থেকে আইটেম অপসারণ করার ফাংশন
  const removeFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.name !== item.name));
    } else {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // মোট মূল্য গণনা করার ফাংশন
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  // চেকআউট নোটিফিকেশন
  const handleCheckout = () => {
    setShowNotification(true); // নোটিফিকেশন দেখান
    setCart([]);
    setOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <header className='header py-[0.833vw] px-0 fixed top-0 left-0 right-0 z-[99] w-full px-[1vw]'>
        <nav className="header-menu flex justify-between items-center gap-[1.25vw]">
          <div className="burger-icon bg-[var(--primary-color)] p-[0.833vw] text-[6vw] md:text-[1.5vw] rounded-lg cursor-pointer">
            <FaBars />
          </div>
          <div className="search-box bg-[var(--decent-color)] radius-[0.833vw] flex items-center gap-[0.833vw] p-[0.833vw] rounded-[0.833vw] flex-1">
            <FaSearch className='text-[var(--primary-color)]' />
            <input className='search-input outline-none bg-[transparent] px-[0.4vw] ' type="text" placeholder="Search for food" />
          </div>
          <div className="menu-icon flex items-center gap-[1vw]">
            <FaBowlFood className='rounded-[0.52vw] cursor-pointer text-[6vw] md:text-[3vw] bg-[var(--decent-color)] p-[0.3vw]' />
            <div className="cart-icon">
              <FaShoppingCart onClick={() => setOpen(!open)} className='rounded-[0.52vw] cursor-pointer text-[6vw] md:text-[3vw] bg-[var(--decent-color)] p-[0.3vw] relative' />
              <span className='absolute top-[0.2vw] md:top-[0.1vw] right-[0.1vw] md:right-[0.1vw] bg-[var(--secondary-color)] text-[var(--accent-color)] p-[0.5vw] rounded-[50%] w-[4vw] h-[4vw] md:w-[2vw] w-[4vw] h-[4vw] md:h-[2vw] text-[2.5vw] md:text-[1vw] flex justify-center items-center weight-[600]'>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Cover */}
      <section className="cover mt-[12.5vw] md:mt-[6.5vw] bg-cover bg-center h-[25vw] md:h-[15vw] w-full rounded-[3vw] md:rounded-[1vw] relative">
        <div className="cover-overlay text-[var(--accent-color)] bg-[rgba(0,0,0,0.5)] h-full w-full p-[1vw] rounded-[3vw] md:rounded-[1vw]">
          <h1 className='text-[5vw] md:text-[2.5vw] font-bold'>Quick Bite</h1>
          <span>Where Taste Takes The First Lane</span>
        </div>
      </section>

      {/* Menulist */}
      <h2 className="section-heading text-[8vw] font-[600] md:text-[2.5vw]">Food Menu</h2>
      <div className="menu-list flex flex-wrap justify-center gap-[1.25vw] mt-[1.25vw] md:mt-[0.625vw]">
        {/* Menu items */}
        {[
          { name: 'Burger', price: 10, image: burger },
          { name: 'Coffee', price: 3, image: coffee },
          { name: 'Drinks', price: 5, image: drinks },
          { name: 'French', price: 10.7, image: french },
          { name: 'Milkshake', price: 20.6, image: milkshake },
          { name: 'Nuggets', price: 10.5, image: nuggets },
          { name: 'Pizza', price: 30.5, image: pizza },
          { name: 'Salad', price: 17.8, image: salad },
        ].map((item, index) => (
          <div key={index} className="card-list bg-[transparent] rounded-[2vw] md:rounded-[1vw] w-[40vw] md:w-[20vw] flex flex-col items-center justify-center text-[var(--text-color)] border-[1px] border-[var(--decent-color)] px-[0.2vw] md:px-[0.833vw] py-[0.2vw] md:py-[0.52vw] gap-[2.5vw] md:gap-[0.5vw]">
            <img src={item.image} alt={item.name} />
            <div className="card-title font-[800] text-[6vw] md:text-[1.2vw]">{item.name}</div>
            <div className="card-price flex justify-between items-center gap-[1vw] w-[85%]">
              <div className="price text-[6vw] md:text-[1.2vw] font-[600]">${item.price}</div>
              <FaPlusSquare
                onClick={() => addToCart(item)}
                className='bg-[var(--accent-color)] text-[var(--secondary-color)] text-[6.7vw] md:text-[1.7vw] cursor-pointer hover:text-green-400'
              />
            </div>
          </div>
        ))}
      </div>

      {/* Notification */}
      {showNotification && (
        <Notification
          message="Your order has been placed successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Cart sidebar */}
      {open && (
        <div className="sidebar transform transition-all duration-[5s] ease-in-out bg-[var(--decent-color)] fixed h-[100vh] w-full md:w-[40%] top-0 right-0 z-[100] p-[1vw]" id="sidebar">
          <div onClick={() => setOpen(!open)} className="sidebar-close bg-[var(--accent-color)] text-[var(--secondary-color)] rounded-[50%] cursor-pointer font-[600] text-[8vw] md:text-[2.5vw] p-[1.5vw] md:p-[1vw] absolute top-[1vw] right-[1vw] hover:text-green-400">
            <ImExit />
          </div>
          <div className="cart-menu overflow-y-auto h-[80vh]">
            <h1 className='font-[600] text-[5vw] md:text-[2.8vw] text-[var(--secondary-color)]'>My cart</h1>
            {cart.length === 0 ? (
              <div className="cart-temps flex flex-col gap-[1.4vw] justify-between border-solid border-2 border-[var(--primary-color)] rounded-[0.5vw] p-[1vw] mt-[2vw] text-[var(--text-color)]">
                Your cart is empty
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item flex justify-between items-center border-solid border-2 border-[var(--primary-color)] rounded-[0.5vw] p-[1vw] mt-[2vw] text-[var(--text-color)]">
                  <div>
                    <img src={item.image} alt={item.name} className="w-[20vw] h-[20vw] md:w-[2.5vw] md:h-[2.5vw] rounded-[0.5vw]" />
                    <h5>{item.name}</h5>
                    <p>${item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex gap-[1vw]">
                    <button onClick={() => removeFromCart(item)} className="bg-red-500 text-white p-[2.8vw] md:p-[0.5vw] rounded-[0.5vw]">-</button>
                    <button onClick={() => addToCart(item)} className="bg-green-500 text-white p-[2.8vw] md:p-[0.5vw] rounded-[0.5vw]">+</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="sidebar-footer absolute bottom-[2.5vw] w-[95%]">
            <div className="total-amount flex justify-between items-center gap-[1.25vw]">
              <h5>Total</h5>
              <div className="cart-total">${total.toFixed(2)}</div>
            </div>
            <button onClick={handleCheckout} className="checkout-btn w-[100%] p-[0.4vw] bg-[var(--secondary-color)] text-[var(--accent-color)] rounded-[0.52vw] mt-[1.5vw] cursor-pointer">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;