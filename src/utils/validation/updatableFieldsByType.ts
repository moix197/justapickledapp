import { validate } from "utils/formSubmitValidation";

const updatableFieldsByType = {
	staking: {
		hasOwner: true,
		hasTeam: true,
		statusCheck: true,
		pre: ["name", "type", "redeem", "price", "tiers", "teamId", "vaultId"],
		locked: ["teamId"],
		ended: [],
		values: {
			name: {
				validation: "name",
			},
			type: {
				validation: "type",
			},
			redeem: {
				validation: "redeem",
			},
			price: {
				validation: "type",
			},
			tiers: {
				validation: "tiers",
			},
			teamId: {
				validation: "teamId",
			},
			vaultId: {
				validation: "vaultId",
			},
		},
	},
	tokenSales: {
		hasOwner: true,
		hasTeam: true,
		statusCheck: true,
		pre: [
			"name",
			"type",
			"redeem",
			"price",
			"tiers",
			"teamId",
			"vaultId",
			"target",
		],
		locked: ["teamId"],
		ended: [],
		values: {
			name: {
				validation: "name",
			},
			type: {
				validation: "type",
			},
			redeem: {
				validation: "redeem",
			},
			price: {
				validation: "price",
			},
			target: {
				validation: "target",
			},
			tiers: {
				validation: "tiers",
			},
			teamId: {
				validation: "teamId",
			},
			vaultId: {
				validation: "vaultId",
			},
		},
	},
	airdrops: {
		hasOwner: true,
		hasTeam: true,
		statusCheck: true,
		pre: ["name", "type", "redeem", "price", "tiers", "teamId", "vaultId"],
		locked: ["teamId"],
		ended: [],
	},
	vault: {
		hasOwner: true,
		hasTeam: false,
		statusCheck: true,
		pre: ["name", "initialAmount"],
		locked: ["name"],
		ended: [],
		values: {
			name: { validation: "name" },
			initialAmount: {
				validation: "initialAmount",
			},
		},
	},
	teams: {
		hasOwner: true,
		hasTeam: false,
		statusCheck: false,
		pre: ["name", "admins"],
		values: {
			name: {
				validation: "name",
			},
			admins: {
				validation: "admins",
			},
		},
	},
	vesting: {
		hasOwner: true,
		hasTeam: false,
		statusCheck: false,
		pre: ["vesting"],
		values: {
			vesting: {
				validation: "vesting",
			},
		},
	},
	dates: {
		hasOwner: true,
		hasTeam: false,
		statusCheck: false,
		pre: ["launch", "end"],
		values: {
			launch: {
				validation: "launch",
			},
			end: {
				validation: "end",
			},
		},
	},
};

export { updatableFieldsByType };
