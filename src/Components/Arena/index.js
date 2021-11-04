import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/MyEpicGame.json';
import './Arena.css';

const Arena = ({ characterNFT }) => {
    const [gameContract, setGameContract] = useState(null);
    const [boss, setBoss] = useState(null);

    const runAttackAction = async () => { };

    useEffect(() => {
        //async function to get boss data from the sm and set the corresponding state
        const fetchBoss = async () => {
            const bossTxn = await gameContract.getBigBoss();
            console.log('Boss:', bossTxn);
            setBoss(transformCharacterData(bossTxn));
        };

        if (gameContract) {
            //gameContract is set, fetch the boss
            fetchBoss();
        }
    }, [gameContract]);

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

    return (
        <div className="arena-container">
            {/* Boss */}
            {boss && (
                <div className="boss-container">
                    <div className={`boss-content`}>
                        <h2>🔥 {boss.name} 🔥</h2>
                        <div className="image-content">
                            <img src={boss.imageURI} alt={`Boss ${boss.name}`} />
                            <div className="health-bar">
                                <progress value={boss.ar} max={boss.maxAr} />
                                <p>{`${boss.ar}/${boss.maxAr} AR`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="attack-container">
                        <button className="cta-button" onClick={runAttackAction}>
                            {`💥 Attack ${boss.name}`}
                        </button>
                    </div>
                </div>
            )}

            {/* characterNFT */}
            {characterNFT && (
                <div className="players-container">
                    <div className="player-container">
                        <h2>Your Character</h2>
                        <div className="player">
                            <div className="image-content">
                                <h2>{characterNFT.name}</h2>
                                <img
                                    src={characterNFT.imageURI}
                                    alt={`Character ${characterNFT.name}`}
                                />
                                <div className="health-bar">
                                    <progress value={characterNFT.ar} max={characterNFT.maxAr} />
                                    <p>{`${characterNFT.ar} / ${characterNFT.maxAr} AR`}</p>
                                </div>
                            </div>
                            <div className="stats">
                                <h4>{`⚔️ Charisma Points: ${characterNFT.charismaP}`}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Arena;