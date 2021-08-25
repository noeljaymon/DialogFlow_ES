const validateSuggestion = (query)=>{
    let options = ["Music Recommendation", "Play Spotify On Tv","Play spotify On Bluetooth","Latest Songs"]
    if (options.includes(query)) {
        return true;
    }
    else {
        return false;
    }
}

module.exports= validateSuggestion;