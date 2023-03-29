const query = `
query GetMirrorTransactions($digest: String = "I5MmLF-XVSS9YVZAPWAvKqYKItHswbLA5tWgAyJfRA4") {
transactions(tags:[
{
    name:"App-Name",
    values:["MirrorXYZ"],
},
{
    name:"Original-Content-Digest",
    values:[$digest]
}
], sort:HEIGHT_DESC, first: 1){
edges {
    node {
    id
    }
}
}
`;

async function getRawPostList(cursor: string, height: number) {
  return await fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { cursor, height },
    }),
  })
    .then((r: any) => r.json())
    .then((data: any) => data.data.transactions.edges);
}