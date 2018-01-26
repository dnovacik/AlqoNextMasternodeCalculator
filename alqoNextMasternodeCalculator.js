// user input - number of shared masternodes, number of masternodes, number of spendable coins, totalFreeCoins needs to be 10k for program to end
// it counts coins in shared MNs as available
var daysCount = 0;
var sharedMasternodes = 2;
var masternodes = 1;
var freeCoins = 600;
var totalFreeCoins = (sharedMasternodes * 1000) + freeCoins;

// reward for masternodes, currently it's hardcoded, the daily blocks, number of all masternodes and blockreward need to be from some API
function dailyRewardMasternodes(count) {
    return count != 0 ? count * ((1310 / 1594) * 37.5) : 0;
}

// this could also be changed to implement different seats size
function dailyRewardSharedMasternodes(count) {
    return count != 0 ? count * (dailyRewardMasternodes(1) / 10) : 0;
}

// recursively get the number of days
function returnNumberOfDaysTillAnotherMasternode(freeCoins, sharedMasternodes, masternodes) {
    freeCoins += dailyRewardSharedMasternodes(sharedMasternodes) + dailyRewardMasternodes(masternodes);
    totalFreeCoins = (sharedMasternodes * 1000) + freeCoins;
    daysCount++;

    if (totalFreeCoins >= 10000) {
        return daysCount;
    }

    if (freeCoins >= 1000) {
        freeCoins -= 1000;
        sharedMasternodes++;
    }

    return returnNumberOfDaysTillAnotherMasternode(freeCoins, sharedMasternodes, masternodes);
}