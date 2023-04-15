import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import client from "../pages/api/apolloClient";
import { HomeProps, TResponse } from "../types";
import { QUERY_HEADER, QUERY_FOOTER } from "./api/gql";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Container, createStyles } from "@mantine/core";
import variable from "../styles/theme/variables";
import SVG from "../components/svg";
import Script from "next/script";
import { useRouter } from "next/router";
import Banner from "../components/Banner";

interface ChildNode {
	title: string;
	nodeUri: string;
}

//Convert slug to typeHandle
function convertToCamelCase(str: string): string {
	// If the string has no dashes, simply capitalize the first letter and return
	if (!str.includes("-")) {
		return str;
	}

	// Split the string into an array of words
	const words = str.split("-");

	// Capitalize the first letter of each word after the first
	const capitalizedWords = words.map((word, index) => {
		if (index === 0) {
			return word;
		}
		//avoid converting what-s to whatS
		if (word === "s" && words[index - 1] !== "") {
			return word;
		}

		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	// Join the capitalized words back into a single string
	const camelCaseStr = capitalizedWords.join("");

	return camelCaseStr;
}

//Generate table of contents
function extractHeadings(html: string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const headings = doc.querySelectorAll(".toc-content .toc-heading");
	return Array.from(headings).map((heading) => ({
		text: heading.textContent,
		level: heading.tagName.toLowerCase(),
	}));
}

//Add external script whenever router changes
const useExternalScript = (src: string): void => {
	const router = useRouter();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = src;
		script.async = true;

		document.body.appendChild(script);

		// Clean up the script tag when the component is unmounted or the route changes
		return () => {
			document.body.removeChild(script);
		};
	}, [src, router.asPath]); // Add router.asPath to the dependency array
};

//Add active class to secondary nav
function addActiveClassToNav(str: string): void {
	const links = document.querySelectorAll(".sec-nav-item");
	links.forEach((link) => {
		const a = link.querySelector(".sec-nav-link");

		if (a?.getAttribute("href") === str) {
			link.classList.add("active");
		}
	});
}

const useStyles = createStyles((theme) => ({
	content: {
		color: variable.grey600,
		fontFamily: variable.fontFamily,
		fontSize: variable.fontSizeBase,
		fontWeight: variable.fontWeightRegular,
		marginBottom: variable.spacer7,

		h2: {
			fontFamily: variable.fontFamilyMedium,
			fontSize: variable.fontSizeH2,
			color: variable.blueAlt,
			fontWeight: variable.fontWeightMedium,
			marginBottom: variable.spacer2,
			marginTop: variable.spacer7,

		},

		h3: {
			fontFamily: variable.fontFamilyMedium,
			fontSize: variable.fontSizeH3,
			fontWeight: variable.fontWeightMedium,
			marginBottom: variable.spacer2,
			marginTop: variable.spacer7,

			"&.red": {
				color: variable.red300,
				
			},
			"& + h5": {
				marginTop: 0,
			}
		},

		p: {
			marginBottom: variable.spacer4,

			"&.disclaimer": {
				fontFamily: variable.fontFamilyItalic,
				fontWeight: variable.fontWeightLight,
				fontSize: variable.fontSizeXXSmall,
				marginBottom: 0,
				letterSpacing: "0.4px",
			},
		},

		h5: {
			fontFamily: variable.fontFamilyBold,
			fontWeight: variable.fontWeightBold,
			fontSize: variable.fontSizeXl,
			color: variable.blackAlt,
			marginBottom: variable.spacer2,
			marginTop: variable.spacer7,
		},

		h4: {
			fontFamily: variable.fontFamilyMedium,
			fontSize: variable.fontSizeXLarge,
			color: variable.blueAlt,
			fontWeight: variable.fontWeightMedium,
			marginBottom: variable.spacer0,
			marginTop: variable.spacer7,
		},

		li: {
			paddingLeft: variable.spacer3,

			"& li": {
				listStyleType: "disc",
			},

			"& a": {
				fontFamily: variable.fontFamilyMedium,
				color: variable.blue,
				fontSize: variable.fontSizeBase,
				fontWeight: variable.fontWeightMedium,

				"&::after": {
					content:
						"url('/assets/images/discussRiskResult/icons/up-right-from-square-solid.svg')",
					width: "14px",
					height: "14px",
					display: "inline-block",
					marginLeft: variable.spacer2,
				},
			},
		},

		ol: {
			paddingLeft: "1rem",
			li: {
				paddingBottom: variable.spacer2,
			},
		},

		".first-nations-people": {
			position: "relative",
			borderRadius: "4px 0px 0px 4px",
			marginTop: variable.spacer7,
			[variable.mobileDown]: {
				marginLeft: "8px",
			},
			"&:before": {
				content: `""`,
				position: "absolute",
				left: "-32px",
				borderRadius: "2px 0 0 2px",
				width: "32px",
				height: "100%",
				background: `url("/assets/images/discussRiskResult/icons/first-nation-device.no-bg.svg")`,
				backgroundColor: "#7DCBB8",
				backgroundSize: "100%",
				backgroundPosition: "center",
				[variable.mobileDown]: {
					width: "8px",
					left: "-8px",
				},
			},
			"& .wrapper": {
				padding: "32px 24px",
				backgroundColor: "rgba(125,203,184,0.2)",

				"h2:first-of-type": {
					marginTop: 0,
				},
			},
		},

		table: {
			border: "1px solid #EDEFF1",
			opacity: "0.98",
			borderRadius: "8px",
			backgroundColor: "#FFFFFF",
			boxShadow:
				"0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
			marginTop: variable.spacer7,
			marginBottom: variable.spacer5,
			borderSpacing: 0,

			thead: {
				backgroundColor: variable.greyTableBG,
				height: "40px",
				fontFamily: variable.fontFamily,
				fontSize: variable.fontSizeSm,

				th: {
					fontWeight: variable.fontWeightRegular,

					".icon-wrapper": {
						display: "flex",
						justifyContent: "left",
						alignItems: "center",
						paddingLeft: "24px",

						".has-icon": {
							content:
								"url('/assets/images/discussRiskResult/icons/info-circle.svg')",
							color: variable.grey500,
							width: "20px",
							height: "20px",
							display: "inline-block",
							marginRight: variable.spacer3,
						},
					},
				},

				"th.extra-wide": {
					width: "60%",
				},
			},

			tbody: {
				td: {
					padding: "16px 24px",
					//borderBottom: "1px solid rgba(69,89,100,0.16)",
					position: "relative",

					"&:after": {
						content: '" "',
						display: "block",
						width: "100%",
						height: variable.borderHeight,
						borderBottom: "1px solid rgba(69,89,100,0.16)",
						position: "absolute",
						bottom: 0,
						left: 0,
					},

					"&:first-of-type:after": {
						left: "auto",
						right: 0,
						width: `calc(100% - ${variable.spacer5}px)`,
					},

					"&:last-of-type:after": {
						width: `calc(100% - ${variable.spacer5}px)`,
					},

					".grey-bg": {
						borderRadius: "8px",
						backgroundColor: variable.greyTableBG,
						textTransform: "uppercase",
						textAlign: "center",
						fontWeight: variable.fontWeightSemiBold,
						fontSize: variable.fontSizeSm,
						color: variable.grey600,

						"&.sup": {
							textTransform: "lowercase",
						},
					},
				},

				"tr:last-of-type": {
					"td:after": {
						display: "none",
					},
				},
			},
		},

		".horizontal-scroll": {
			overflowX: "auto",

			table: {
				minWidth: "960px",
			},
		},
	},
	pagenation: {
		display: "flex",
		justifyContent: "center",
		gap: variable.spacer2,
		marginBottom: variable.spacer7,

		[variable.mdDown]: {
			flexDirection: "column",
			alignItems: "center",
		},

		a: {
			padding: variable.spacer5,
			border: "1px solid #CFD8DB",
			borderRadius: "8px",
			backgroundColor: variable.white,
			maxWidth: "400px",
			width: "100%",
		},

		p: {
			color: variable.blueAlt,
			fontWeight: variable.fontWeightMedium,

			"&.title": {
				color: variable.grey600,
				fontSize: variable.fontSizeSm,
				letterSpacing: "0.13px",
			},
		},
		".prev": {
			position: "relative",
			paddingLeft: variable.spacer13,

			"&::before": {
				content:
					"url('/assets/images/discussRiskResult/icons/arrow-left.svg')",
				width: "16px",
				height: "16px",
				position: "absolute",
				top: "45%",
				left: "24px",
			},
		},

		".next": {
			position: "relative",
			paddingRight: variable.spacer13,

			"&::after": {
				content:
					"url('/assets/images/discussRiskResult/icons/arrow-right.svg')",
				width: "16px",
				height: "16px",
				position: "absolute",
				top: "45%",
				right: "24px",
			},
		},
	},

	subNav: {
		marginTop: variable.spacer8,
		"& ul": {
			paddingLeft: 0,
			listStyle: "none",
			display: "flex",
			flexDirection: "row",
			alignItems: "stretch",
			alignContent: "flex-start",
			flexWrap: "wrap",
			gap: variable.spacer2,
			"& li": {
				flex: "0 0 calc(99.99% / 7 - 8px)",
				justifyContent: "center",
				alignItems: "center",
				maxWidth: "calc(99.99% / 7 - 8px)",
				width: "100%",
				backgroundColor: variable.greyTableBG,
				borderRadius: "8px",
				[variable.mdDown]: {
					flex: "0 0 calc(99.99% / 4 - 8px)",
					maxWidth: "calc(99.99% / 4 - 8px)",
				},
				[variable.mobileDown]: {
					flex: "0 0 calc(99.99% / 3 - 8px)",
					maxWidth: "calc(99.99% / 3 - 8px)",
				},
				[variable.smDown]: {
					flex: "0 0 calc(99.99% / 1 - 8px)",
					maxWidth: "calc(99.99% / 1 - 8px)",
				},
				"& a": {
					display: "flex",
					alignItems: "center",
					width: "100%",
					height: "100%",
					padding: "16px 12px",
					color: variable.grey600,
					fontSize: variable.fontSizeSm,
					fontFamily: variable.fontFamilyMedium,
					fontWeight: variable.fontWeightMedium,
					letterSpacing: "0.13px",
					lineHeight: "20px",
					"& span": {
						maxHeight: "40px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						lineClamp: 2,
						WebkitBoxOrient: "vertical",
					},
				},
			},
		},
	},
	title: {
		color: variable.grayTitle,
		fontFamily: variable.fontFamilyMedium,
		fontSize: variable.fontSizeBase,
		paddingBottom: variable.spacer4,
	},
	subtitle: {
		color: variable.white,
		fontFamily: variable.fontFamilyPoppinMedium,
		fontSize: variable.fontSizeXXLarge,
	},
}));

export default function Post({ data }: HomeProps) {
	const { classes, theme } = useStyles();
	//console.log(data);
	const heroTitle = data.entry.title;
	const parentNode = data.navigationNodes.find((node) =>
		node.children.find((child) => child.nodeUri === data.entry.slug)
	);

	//console.log(parentNode);
	//generate table of contents
	const [headings, setHeadings] = useState<
		{ text: string | null; level: string }[]
	>([]);

	useEffect(() => {
		setHeadings(extractHeadings(data.entry.redactor));
		addActiveClassToNav(data.entry.slug);
	}, [data.entry.redactor]);

	//generate sibling navigation at the page bottom
	let previousSibling: ChildNode | null = null;
	let nextSibling: ChildNode | null = null;
	if (parentNode) {
		const children = parentNode.children;
		const childIndex = children.findIndex(
			(child) => child.nodeUri === data.entry.slug
		);

		previousSibling = childIndex > 0 ? children[childIndex - 1] : null;
		nextSibling =
			childIndex < children.length - 1 ? children[childIndex + 1] : null;

		/* console.log(
			"Previous sibling:",
			previousSibling ? previousSibling : "None"
		); */
		//console.log("Hero title:", heroTitle);
		//console.log("Next sibling:", nextSibling ? nextSibling.title : "None");
	} else {
		//console.log("Parent node not found.");
	}

	// add external js
	useExternalScript("/tableScript.js");

	// add id to h2.toc-headings
	const contentRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		if (contentRef.current) {
			const headings =
				contentRef.current.querySelectorAll(".toc-content");

			headings.forEach((heading) => {
				const h2 = heading.querySelector(".toc-heading");
				if (h2) {
					const id = h2.textContent?.toLowerCase().replace(/ /g, "-");
					if (id) {
						heading.setAttribute("id", id);
					}
				}
			});
		}
	}, [slug]);

	return (
		<>
			<Layout data={data}>
				{parentNode && (
					<Banner>
						<p className={classes.title}>
							|&nbsp;&nbsp;{parentNode.title}
						</p>

						<p className={classes.subtitle}>{heroTitle}</p>
					</Banner>
				)}
				<Container size={variable.breakpointAlt} px={variable.spacer4}>
					{/* child navigation */}
					{parentNode && (
						<div className={classes.subNav}>
							<ul>
								{parentNode.children.map((node) => (
									<li className="sec-nav-item" key={node.id}>
										<a
											className="sec-nav-link"
											href={node.nodeUri}
										>
											<span>{node.title}</span>
										</a>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* content */}
					<section className="cms-content" ref={contentRef}>
						{headings && headings.length > 0 && (
							<div className="table-of-contents">
								<ul>
									{headings.map((heading, index) => (
										<li
											key={index}
											className={`toc-${heading.level}`}
										>
											<a
												href={`#${heading.text
													?.toLowerCase()
													.replace(/ /g, "-")}`}
											>
												{heading.text}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}

						<div
							className={`${classes.content} right`}
							dangerouslySetInnerHTML={{
								__html: data.entry.redactor,
							}}
						/>
					</section>
					<section className={classes.pagenation}>
						{previousSibling && (
							<a className="prev" href={previousSibling.nodeUri}>
								<p>Go to previous section</p>
								<p className="title">{previousSibling.title}</p>
							</a>
						)}
						{nextSibling && (
							<a className="next" href={nextSibling.nodeUri}>
								<p>Continue to next section</p>
								<p className="title">
									{nextSibling.title}
								</p>
							</a>
						)}
					</section>
				</Container>
			</Layout>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await client.query<TResponse>({
		query: gql`
			query GetEntries {
				entries {
					slug
				}
			}
		`,
	});

	const paths = data.entries.map((entry) => ({
		params: { slug: entry.slug },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params || !params.slug) {
		return { notFound: true };
	}

	const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

	// Convert the type parameter to camelCase
	const camelCaseSlug = convertToCamelCase(slug);

	const { data } = await client.query({
		query: gql`
			query GetData {
                ${QUERY_HEADER}
                ${QUERY_FOOTER}
               
				entry(slug: "${slug}") {
					... on ${camelCaseSlug}_${camelCaseSlug}_Entry {
						id
                        title
                        slug
						redactor
					}
				}
			}
		`,
	});

	return {
		props: {
			data,
		},
	};
};