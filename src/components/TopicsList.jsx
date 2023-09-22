import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import Image from "next/image";
import styles from "../app/styles/topicslist.module.css";
import moment from "moment";

const getTopics = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    throw error;
  }
};

export default async function TopicsList() {
  try {
    const { topics } = await getTopics();

    return (
      <div className="w-[80%] flex-col">
        <div className="flex flex-col-reverse">
          {topics &&
            topics.map((t) => (
              <div
                key={t._id}
                className="p-4 border border-gray-100 my-3 flex flex-col justify-between gap-5 items-start rounded-md"
              >
                <div className="w-full h-full relative">
                  <Image
                    src={t.picture}
                    width={600}
                    height={500}
                    alt={t.title}
                    style={{
                      WebkitMaskImage: "url(/images/paintbrush.png)",
                      maskImage: "url(/images/paintbrush.png)",
                      objectFit: "cover",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "cover",
                      maskSize: "cover",
                      maskPosition: "bottom",
                    }}
                    className="w-full h-full object-cover object-bottom  bg-gray-300"
                  />
                  <h1 className="text-8xl text-white mb-5 font-freehand absolute right-14 top-24">
                    {t.title}
                  </h1>

                  <div className="w-full md:w-[90%] mx-auto">
                    <div className="text-gray-500 py-2 flex flex-rows ">
                      <p className="capitalize">{t.title}&nbsp;&nbsp;</p>

                      <p>
                        {" "}
                        {moment(t.createdAt).format(" DD MMM YYYY")}
                        &nbsp;/&nbsp;Birdie&nbsp;-&nbsp;My Travel Blogspot
                      </p>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: t.description }}
                      className={styles.topiclist}
                    />
                  </div>
                </div>

                <div className="w-full flex flex-row gap-5 justify-center mt-5 mb-5">
                  <RemoveBtn id={t._id} />
                  <Link href={`/editTopic/${t._id}`}>
                    <button className="px-8 py-2 bg-green-500 hover:bg-green-700 rounded text-white font-bold">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error in TopicsList: ", error);
    return <div>Error loading topics. Please try again later.</div>;
  }
}
