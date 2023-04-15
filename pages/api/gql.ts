export const QUERY_HEADER = `
navigationNodes (level: 1) {
    id
    title
    nodeUri
    navHandle
    children {
        id
        title
        nodeUri
        navHandle
    }
}
`;

export const QUERY_FOOTER = `
  CopyrightEntry: entry(uri: "copyright") {
    ... on copyright_copyright_Entry {
      id
      redactor
    }
  }
  AOCEntry: entry(uri: "acknowledgement-of-country") {
    ... on acknowledgementOfCountry_acknowledgementOfCountry_Entry {
      id
      title
      redactor
    }
  }
  InitiativeEntry: entry(uri: "initiative") {
    ... on initiative_initiative_Entry {
      id
      title
      redactor
    }
  }
`;

export const QUERY_SEC_NAV = `
SecNav: navigationNodes (level: 2) {
        id
        title
        nodeUri
        parent {
            title
            children {
                id
                title
                nodeUri
            }
        }
    } 
`;

export const QUERY_HOME = `
HomeEntry: entry(slug:"homepage") {    
    ...on homepage_homepage_Entry {
      id
      title
      redactor
	  }
}

`;
