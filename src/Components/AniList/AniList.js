import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
function AniList() {
  const query = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search) {
          id
          title {
            romaji
          }
        }
      }
    }
  `;
  const { error, loading, data } = useQuery(query);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    if (data) {
      setList(data.Page.media);
    }
  }, [data]);

  if (error) {
    return <p>Opps! error occured</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {list.map((item) => (
        <p key={item.id}>
          ID ={item.id}: {item.title.romaji}
        </p>
      ))}
    </div>
  );
}

export default AniList;
