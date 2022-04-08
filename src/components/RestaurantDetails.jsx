import axios from "axios";
import { useEffect, useState } from "react";
// import "./styles.css";

export default function RestaurantDetails() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  const perPage = 5;

  const fetchData = (page, perPage) => {
    setLoading(true);
    setErr(false);
    axios("http://localhost:5000/restaurants", {
      method: "GET",
      params: {
        _page: page,
        _limit: perPage
      }
    })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
        setErr(true);
      });
  };

  useEffect(() => {
    fetchData(page, perPage);
  }, [page, perPage]);
  console.log(data);

  return (
    <div>
		<h1>My Restaurant</h1>
      
      <div>
        <button>4 and above</button>
		<button>3 and above</button>
		<button>2 and above</button>
		<button>1 and above</button>
      </div>

      <div>
        <button>Cash</button>
		<button>Card</button>
		<button>All</button>      
      </div>

      <div>
        <button onClick={()=>handleescSort("price")}>asc</button>
        <button onClick={()=>handleescSort("price",false)}>dsc</button>     
      </div>

      {err && <div className="error"> Something went wrong! Try again </div>}
      <div>
        {data.map((item) => (
          <div style={{ display: "flex", gap: "1rem", height: "300px", backgroundColor:"brown", marginTop:"30px" }} key={item.id}>
            <div></div>
			<img src={item.src} style={{height: "200px",width: "300px", marginTop:"30px"}} />
            <div>
				<h2>{item.name}</h2>
				<p>{item.rating}</p>
				<p></p>
			</div>
          </div>
        ))}
      </div>
      {loading && <div>...loading</div>}
      <button
        disabled={loading || page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        PREV
      </button>
      <button disabled={loading} onClick={() => setPage(page + 1)}>
        NEXT
      </button>
      <div>Current page: {page}</div>
    </div>
  );
}
