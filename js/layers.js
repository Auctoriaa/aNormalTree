addLayer("t", {
    name: "Time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF00FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "time", // Name of prestige currency
    baseResource: "space", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Realtime",
            description: "Time boosts Space gain",
            cost: new Decimal(1),
            effect() {
            return player[this.layer].points.add(1).log(2).add(1.2).pow(2)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Size Comparison",
            description: "Time upgrades boost Space gain.",
            cost: new Decimal(10),
            effect() {
            return player.t.upgrades.length},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"+" },
        },
    },
    layerShown(){return true}
})
