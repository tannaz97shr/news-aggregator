import { useLoaderData } from "react-router-dom";

export async function loader({ params }: { params: any }) {
  // const contact = await getContact(params.contactId);
  // return { contact };
  console.log("loader params", params);
  return { article: "article" };
}

const ArticleDetails = () => {
  const data = useLoaderData();

  console.log("loader data", data);
  return <div>this is article detaial section</div>;
};

export default ArticleDetails;
