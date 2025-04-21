import {useEffect, useState} from "react";
import {SpaghettiPlate, SpaghettiPlateCartItem} from "./types/spaghetti-plate.ts";

export default function App() {
    const [spaghettiPlates, setSpaghettiPlates] = useState<SpaghettiPlate[]>([]);
    const [cartItems, setCartItems] = useState<SpaghettiPlateCartItem[]>([]);
    const [total, setTotal] = useState(0);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        fetch('/api/spaghetti-plates')
            .then(response => response.json())
            .then(data => setSpaghettiPlates(data));
    }, [])

    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + (item.price * item.quantity), 0);

        setTotal(total);
    }, [cartItems]);

    function renderTotals() {
        return (<>
            <h1 className={'font-bold text-3xl text-amber-700'}>Totals</h1>
            <div className={'flex gap-4 h-full justify-between'}>
                <p className={'font-bold text-2xl'}>Total:</p>
                <p className={'font-bold text-2xl'}>${(total / 100).toFixed(2)}</p>
            </div>
        </>)
    }

    return <main className={'flex flex-col relative w-screen h-screen'}>
        <header>
            <h1 className={'font-bold text-6xl p-2 bg-neutral-700 text-yellow-600'}>
                Spaghetti House
            </h1>
        </header>
        <section className={'flex flex-col w-screen gap-4 p-4'}>
            <h1 className={'font-bold text-3xl text-amber-700'}>
                Menu
            </h1>
            <div className={'flex flex-col flex-wrap sm:flex-row md:flex-row lg:flex-row gap-2 justify-center'}>
                {
                    spaghettiPlates.map(plate =>
                        <article key={plate.id}
                                 className={'flex flex-col relative w-56 h-56 gap-2 p-4 bg-neutral-700 rounded-md cursor-pointer'}
                                 onClick={() => {
                                     const found = cartItems.find(item => item.id === plate.id);

                                     if (found) {
                                         const updatedCart = cartItems.map(item =>
                                             item.id === found.id
                                                 ? {...item, quantity: item.quantity + 1}
                                                 : item
                                         );
                                         setCartItems(updatedCart);
                                     } else {
                                         setCartItems([...cartItems, {...plate, quantity: 1}]);
                                     }
                                 }}>
                            <h1 className={'font-bold text-xl'}>{plate.name}</h1>
                            <p className={'text-neutral-400 italic'}>{plate.description}</p>
                            <p className={'absolute bottom-2 font-bold'}>${plate.price / 100}</p>
                        </article>)
                }
            </div>
        </section>
        <section className={'flex flex-col w-screen gap-4 p-4'}>
            <h1 className={'flex font-bold gap-4 text-3xl text-amber-700 items-center'}>
                Cart
                <span
                    className={'rounded-4xl border border-amber-700 w-8 h-8 text-xl text-white text-center bg-amber-700'}>
                    {itemCount}
                </span>
            </h1>
            <div className={'flex flex-col gap-2 h-52 overflow-auto border border-neutral-700 rounded-xl p-2'}>
                {
                    cartItems.map(item =>
                        <article key={item.id}
                                 className={'flex flex-col p-3 gap-4 bg-neutral-700 rounded-md'}>
                            <div className={'flex gap-4 justify-between items-center font-bold text-xl'}>
                                <div className={'flex justify-center items-center gap-2'}>
                                     <span
                                         className={'flex justify-center items-center rounded-4xl border border-amber-700 w-6 h-6 text-sm text-white bg-amber-700'}>
                    {item.quantity}
                </span>
                                    <h1>{item.name}</h1>
                                </div>
                                <div className={'flex justify-center items-center gap-2'}>
                                    <p className={'flex font-bold text-sm'}>${item.price / 100}</p>
                                    <p onClick={() => {
                                        const updatedCart = cartItems.filter(cartItem => {
                                            return cartItem.id !== item.id;
                                        });

                                        setCartItems(updatedCart);
                                    }}
                                       className={'flex cursor-pointer justify-center items-center rounded-4xl w-6 h-6 text-sm text-white bg-red-700 hover:bg-red-500'}>
                                        X
                                    </p>
                                </div>
                            </div>
                        </article>)
                }
            </div>
        </section>
        <hr className={'border-2 border-neutral-700'}/>
        <section className={'flex flex-col gap-4 p-4 h-full justify-between'}>
            {renderTotals()}
        </section>
        <footer
            className={'flex absolute bottom-0 w-screen h-10 gap-4 bg-neutral-700 justify-center items-center'}>
            <p>Spaghetti House</p>
        </footer>
    </main>
}
