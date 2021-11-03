const CONTRACT_ADDRESS = '0x9E0982CF9EeB0a61c58ca692f3582482d1dcEa10';

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


