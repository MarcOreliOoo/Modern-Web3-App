import React, {useContext} from 'react';
import { ChangeEvent, FunctionComponent } from "react";
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { TransactionContext } from "../context/TransactionContextProvider";
import { Loader } from './';
import { MyFormData } from '../types/types';

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

type InputProps = {
	placeholder: string;
	name: keyof MyFormData;
	type: string;
	value?: number|string;
	xChange: (e: ChangeEvent<HTMLInputElement>, name: keyof MyFormData) =>  void;
};

const Input:FunctionComponent<InputProps> = ({ placeholder, name, type, value, xChange }) => (
	<input 
		placeholder={placeholder}
		type={type}
		step="0.0001"
		value={value}
		onChange={(e) => xChange(e,name)}
		className="border-none my-2 w-full rounded-none p-2 outline-none bg-transparent text-white text-sm white-glassmorphism"
	/>
);

let Welcome:FunctionComponent = () => {
	const { connectWallet, currentAccount, formData, handleChange, sendTransaction }  = useContext(TransactionContext);
	
	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { addressTo, amount, keyword, message } = formData;
		event.preventDefault(); //We don't want the page to reload
		if(!addressTo || !amount || !keyword || !message) return;
		sendTransaction();
	};

	console.log("Welcome_ " + JSON.stringify(formData));

	return(
		<div className="flex w-full justify-center items-center">
			<div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">

				{/** LeftSide : Title + Connect button + KeyWords space */}
				<div className="flex flex-1 jusitfy-start flex-col mf:mr-10">
					
					{/** Title */}
					<h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
						Send crypto<br /> across the world!
					</h1>
					<p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
						Explore the crypto world, buy and sell easily your cryptos
					</p>

					{/** Connect button */}
					{!currentAccount && (<button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] rounded-full p-3 cursor-pointer hover:bg-[#2546bd]">
						<p className="text-white text-base font-semibold">
							Connect Wallet
						</p>
					</button>
					)}

					{/** Keywords space */}
					<div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
						<div className={`rounded-tl-2xl ${commonStyles}`}>
							Reliability
						</div>
						<div className={`${commonStyles}`}>
							Security
						</div>
						<div className={`rounded-tr-2xl ${commonStyles}`}>
							Ethereum
						</div>
						<div className={`rounded-bl-2xl ${commonStyles}`}>
							Web 3.0
						</div>
						<div className={`${commonStyles}`}>
							Low fees
						</div>
						<div className={`rounded-br-2xl ${commonStyles}`}>
							Blockchain
						</div>
					</div>
				</div>

				{/** RightSide :  Carte ETH + Input */}
				<div className="flex flex-col flex-1 items-center jusitfy-start w-full mf:mt-0 mt-10">
					
					{/** Carte ETH */}
					<div className="p-3 jusitfy-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
						<div className="flex justify-between flex-col w-full h-full ">
							<div className="flex justify-between items-start">
								<div className="w-10 h-10 border-2 rounded-full border-white flex justify-center items-center">
									<SiEthereum fontSize={21} color="#fff" />
								</div>
								<BsInfoCircle fontSize={17} color="#fff" />
							</div>
							<div>
								<p className="text-white font-light text-sm">
									0x123...def
								</p>
								<p className="text-white font-semibold text-lg mt-1">
									Ethereum
								</p>
							</div>
						</div>
					</div>

					{/** Input */}
					<div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
						<form>
						<Input placeholder="Address To" name="addressTo" type="text" xChange={handleChange} />
						<Input placeholder="Amount (ETH)" name="amount" type="number" xChange={handleChange} />
						<Input placeholder="Keyword (Gif)" name="keyword" type="text" xChange={handleChange} />
						<Input placeholder="Enter Message" name="message" type="text" xChange={handleChange} />

						<div className="h-[1px] w-full bg-gray-400"/>
						{false ? (
							<Loader />
						) : (
							<button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">
								Send Now
							</button>
						)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;