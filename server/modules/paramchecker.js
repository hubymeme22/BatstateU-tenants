// returns parameters that are missed
export default function paramChecker(neededParams, referenceParams) {
    const missedParams = [];
    neededParams.forEach(parameter => {
        if (referenceParams[parameter] == null)
            missedParams.push(parameter);
    });

    return missedParams;
}