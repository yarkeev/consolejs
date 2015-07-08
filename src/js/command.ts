interface Command {
	name: String;
	description: String;
	isLocked: boolean;
	fn: Function;
}

export = Command;
