const CONTRACT_ADDRESS = "0xb925eB44c44FfE2c77C3872f1472a58C42e0e38a";

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: characterData.imageURI,
        ar: characterData.ar.toNumber(),
        maxAr: characterData.maxAr.toNumber(),
        charismaP: characterData.charismaP.toNumber(),
    };
};

export { CONTRACT_ADDRESS, transformCharacterData };


