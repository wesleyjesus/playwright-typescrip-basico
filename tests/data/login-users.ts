export type LoginUser = {
	email: string
	displayName?: string
	unit?: string
}

export const loginUsers = {
	valid: {
		email: process.env.MPF_VALID_USER_EMAIL || 'wesleyjesus@mpf.mp.br',
		displayName: process.env.MPF_VALID_USER_DISPLAY_NAME || 'WESLEY JESUS',
		unit: process.env.MPF_VALID_USER_UNIT || 'CIVINT/STIC',
	},
	noPermissions: {
		email: process.env.MPF_NO_PERMISSIONS_USER_EMAIL || 'user@gmail.com',
	},
	unknownMpfUser: {
		email: process.env.MPF_UNKNOWN_USER_EMAIL || 'usuarioinexistente@mpf.mp.br',
	},
} as const satisfies Record<string, LoginUser>
