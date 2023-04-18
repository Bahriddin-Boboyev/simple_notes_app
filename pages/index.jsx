import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
export default function Home() {
  const [show, setShow] = useState(null);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [renID, setRenID] = useState(null);

  function fetchDataPost(value, value2) {
    fetch("http://localhost:3000/api/server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value,
        description: value2,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Notes muaffaqiyatli qo'shildi");
        } else {
          alert("Notes qo'shilmadi");
        }
      })
      .catch((rej) => console.log(rej));
  }
  useEffect(() => {
    setRender(!render);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/server", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [render, setRender]);

  function submitHandler(e) {
    e.preventDefault();
    setRender(!render);
    fetchDataPost(e.target[0].value, e.target[1].value);
  }

  function handlerDelete(id) {
    fetch(`http://localhost:3000/api/server?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setRender(!render);
          alert("Note deleted successfully");
        } else {
          alert("Note could not be deleted");
        }
      })
      .catch((error) => console.error(error));
  }

  function fetchDataUpdate(value, value2, id) {
    fetch(`http://localhost:3000/api/server?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value,
        description: value2,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Notes muaffaqiyatli qo'shildi");
        } else {
          alert("Notes qo'shilmadi");
        }
      })
      .catch((rej) => console.log(rej));
  }

  function updateHandler(e, id) {
    e.preventDefault();
    setRender(!render);
    fetchDataUpdate(e.target[0].value, e.target[1].value, id);
  }

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="container">
          <h1 className="main_title">Hey, Welcome</h1>
          <div className="main_box">
            <div className="btn btn-group btn-group-2">
              <button
                className="btn btn-primary btn-2"
                onClick={() => setShow("create")}
              >
                Create Notes
              </button>
              <button
                className="btn btn-warning btn-2 btn-3"
                onClick={() => setShow("show")}
              >
                Notes List
              </button>
            </div>
            {show === "create" ? (
              <>
                <form className="main_input" onSubmit={(e) => submitHandler(e)}>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Note title"
                  />
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Note description"
                  />
                  <button className="btn btn-success" type="submit">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <ul>
                {data?.map((item) => (
                  <li key={item?.id} className="main_list">
                    <h2>
                      {item.name?.length > 20
                        ? item?.name.slice(0, 20) + "..."
                        : item?.name}
                    </h2>
                    <p>
                      {item.description?.length > 130
                        ? item?.description.slice(0, 130) + "..."
                        : item?.description}
                    </p>
                    <button
                      onClick={() => handlerDelete(item.id)}
                      type="button"
                      className="btn btn-secondary btn-trash"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                      </svg>
                    </button>

                    <button
                      onClick={() => setRenID(item.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      type="button"
                      className="btn btn-secondary btn_edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        ></path>
                      </svg>
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Edit Notes
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form
                              className="main_input"
                              onSubmit={(e) => updateHandler(e, renID)}
                            >
                              <input
                                required
                                type="text"
                                className="form-control"
                                placeholder="Note title"
                              />
                              <input
                                required
                                type="text"
                                className="form-control"
                                placeholder="Note description"
                              />
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  data-bs-dismiss="modal"
                                  className="btn btn-primary"
                                >
                                  Save changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
