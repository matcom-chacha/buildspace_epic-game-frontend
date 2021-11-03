const CONTRACT_ADDRESS = "0xDf4F363a45E4f8b3d454eE65c88E9439d35356D9";

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


