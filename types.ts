export interface NavItem {
	id: string;
	title: string;
	url: string;
	nodeUri: string;
	navHandle: string;
	children: NavItem[];
}

export interface NavProps {
	nav: NavItem[];
}

export interface EntryItem {
	id: string;
    slug:string;
	title: string;
	redactor: string;
}

export interface EntryProps {
	content: EntryItem;
}

export interface HomeProps {
	data: {
		entry: EntryItem;
        navigationNodes: NavItem[];
		CopyrightEntry: EntryItem;
		AOCEntry: EntryItem;
		InitiativeEntry: EntryItem;
		HomeEntry: EntryItem;
	};
}

export interface TEntry {
	slug: string;
}

export interface TResponse {
	entries: TEntry[];
}
