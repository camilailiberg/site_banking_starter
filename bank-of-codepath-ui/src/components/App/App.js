// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// allow aus to do http requests just like insomnia does
// how are we going to get the app to mkae that request as soon as it mounts to the page //* useEffect
//* useEffect: we pass it a function that runs everythime this app renders.

export default function App() {
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	const [filterInputValue, setFilterInputValue] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [transfers, setTransfers] = useState([]);

	//* we pass it a call back function which will run everytime this app function is run to generate this JSX HTML.
	useEffect(() => {
		//! inside here we want to make sure we make a GET request to our blog api - http://localhost:3001/bank/transactions
		const fetchTransactions = async () => {
			try {
				if (!isFetching) {
					setIsFetching(true);
				}
				const res = await axios.get("http://localhost:3001/bank/transactions"); //* axios attaches the res.data.transactions
				const transactionsReturned = res?.data?.transactions; // does res exists? if it does get data; does data exists? if it does get transactions. If at any point this through this chain anything messes up, it will give you a null value.
				if (transactionsReturned) {
					setTransactions(transactionsReturned);
				}

				const resTransfers = await axios.get(
					"http://localhost:3001/bank/transfers"
				);
				const transfersReturned = resTransfers?.data?.transfers;
				if (transfersReturned) {
					setTransfers(transfersReturned);
				}
			} catch (err) {
				setError(err);
			}

			setIsFetching(false);
		};

		fetchTransactions();
	}, []); //* everything inside the useEffect runs wherever something in this array changes. The array is epty in this case because we want this useEffect to run only once
	return (
		<div className="App">
			<Navbar />
			<Home />
		</div>
	);
}
