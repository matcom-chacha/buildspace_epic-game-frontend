const CONTRACT_ADDRESS = "0x65084aD516bbC273dDcA8937C1C2341745CB4a42";

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


