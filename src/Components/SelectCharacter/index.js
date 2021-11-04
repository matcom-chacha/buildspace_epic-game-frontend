import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import LoadingIndicator from '../LoadingIndicator';

const SelectCharacter = ({ setCharacterNFT }) => {
    const [characters, setCharacters] = useState([]);
    const [gameContract, setGameContract] = useState(null);
    const [mintingCharacter, setMintingCharacter] = useState(false);

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                myEpicGame.abi,
                signer
            );

            setGameContract(gameContract);
        }
        else {
            console.log('Ethereum object not found');
        }
    }, []);

    useEffect(() => {
        const getCharacters = async () => {
            try {
                console.log('Getting contract characters to mint');
                //calling contract to get all characters 
                const charactersTxn = await gameContract.getAllDefaultCharacters();

                //go through all character and transform the data
                const characters = charactersTxn.map((characterData) => transformCharacterData(characterData));

                console.log("Characters", characters);
                setCharacters(characters);
            }
            catch (error) {
                console.log('Something went wrong fetching characters:', error);
            }
        };

        //a callback method that will fire when this events is received
        const onCharacterMint = async (sender, tokenId, characterIndex) => {
            console.log(`CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`);

            //fetch metadata, set the state and move to the arena
            if (gameContract) {
                console.log(gameContract);
                const characterNFT = await gameContract.checkIfUserHasNft();
                console.log('CharacterNFT:', characterNFT);
                alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
                setCharacterNFT(transformCharacterData(characterNFT));
            }
        };

        if (gameContract) {
            getCharacters();

            //setup NFT Minted Listener
            gameContract.on('CharacterNFTMinted', onCharacterMint);
        }

        return () => {
            if (gameContract) {
                gameContract.off('CharacterNFTMinted', onCharacterMint);
            }
        };
    }, [gameContract]);

    const mintCharacterNFTAction = (characterId) => async () => {
        try {
            if (gameContract) {
                setMintingCharacter(true);
                console.log('Minting character in progress...');
                const mintTxn = await gameContract.mintCharacterNFT(characterId);
                await mintTxn.wait();
                console.log('mintTxn:', mintTxn);
                setMintingCharacter(false);
            }
        }
        catch (error) {
            console.warn('MintCharacterAction Error:', error);
            setMintingCharacter(false);
        }
    };

    const renderCharacters = () =>
        characters.map((character, index) => (
            <div className="character-item" key={character.name}>
                <div className="name-container">
                    <p>{character.name}</p>
                </div>
                <img src={character.imageURI} alt={character.name} />
                <button
                    type="button"
                    className="character-mint-button"
                    onClick={mintCharacterNFTAction(index)}
                >{`Mint ${character.name}`}</button>
            </div>
        ));

    return (
        <div className="select-character-container">
            <h2>Mint Your Serial. Choose wisely.</h2>
            {characters.length > 0 && (
                <div className="character-grid">{renderCharacters()}</div>
            )}
            {mintingCharacter && (
                <div className="loading">
                    <div className="indicator">
                        <LoadingIndicator />
                        <p>Minting in Progress...</p>
                    </div>
                    <img
                        src="https://media2.giphy.com/media/61tYloUgq1eOk/giphy.gif?cid=ecf05e47dg95zbpabxhmhaksvoy8h526f96k4em0ndvx078s&rid=giphy.gif&ct=g"
                        alt="Minting loading indicator"
                    />
                </div>
            )}
        </div>
    );
};

export default SelectCharacter;