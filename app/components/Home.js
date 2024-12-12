import React, { useContext, useEffect, useState } from "react"
import { useImmer } from "use-immer"
import ReactPaginate from "react-paginate"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"
import { IconContext } from "react-icons"
import Axios from "axios"
import Page from "./Page"
import HomeCards from "./HomeCards"
import LoadingDotsIcon from "./LoadingDotsIcon"

function Home() {
  const groups = ["آمار", "اخلاق", "اقتصاد اسلامي", "تربيت  بدني", "حسابداري", "حقوق  جزا و جرم  شناسي", "حقوق  خصوصي", "حقوق بين الملل", "حقوق عمومي", "حقوق مالكيت فكري", "رياضي", "زبان  و ادبيات  انگليسي", "زبان  و ادبيات  عربي", "زبان  و ادبيات  فارسي", "زيست شناسي", "شيعه شناسي", "شيمي", "علم اطلاعات و دانش شناسي", "علوم  تربيتي", "علوم قرآن و حديث", "علوم كامپيوتر", "فقه  و مباني  حقوق  اسلامي", "فلسفه  و كلام  اسلامي", "فيزيك", "مديريت بازرگاني", "مديريت صنعتي", "معارف", "معماري", "مهندسي  صنايع", "مهندسي برق", "مهندسي شيمي", "مهندسي عمران", "مهندسي كامپيوتر", "مهندسي مكانيك"]
  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    groupSearch: "",
    show: "nither",
    requestCount: 0
  })

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(9)

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++
          console.log(state.searchTerm, state.groupSearch)
        })
      }, 3000)

      return () => clearTimeout(delay)
    } else {
      setState(draft => {
        draft.show = "neither"
      })
    }
  }, [state.searchTerm, state.groupSearch])

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          if (state.groupSearch) {
            const response = await Axios.get(`/professor/search?query=${state.searchTerm}&group=${state.groupSearch}`, { searchTerm: state.searchTerm, group: state.groupSearch })
            setState(draft => {
              draft.results = response.data
              draft.show = "results"
            })
          } else {
            const response = await Axios.get(`/professor/search?query=${state.searchTerm}`, { searchTerm: state.searchTerm })
            setState(draft => {
              draft.results = response.data
              draft.show = "results"
            })
          }
        } catch (e) {
          console.log("There was a problem or the request was cancelled.")
        }
      }
      fetchResults()
      return () => ourRequest.cancel()
    }
  }, [state.requestCount])

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await Axios.get("/professor/all")
        setCards(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchCards()
  }, [])

  if (isLoading) return <LoadingDotsIcon />

  function handleInput(e) {
    let value = e.target.value
    if (value.includes("ی")) {
      value = value.replace("ی", "ي")
    }
    setState(draft => {
      draft.searchTerm = value
    })
  }

  function handleGroup(e) {
    const value = e.target.value
    alert(value)
    setState(draft => {
      draft.groupSearch = value
    })
  }

  const lastCardIndex = currentPage * cardsPerPage
  const firstCardIndex = lastCardIndex - cardsPerPage
  const currentCardsBeforSearch = cards.slice(firstCardIndex, lastCardIndex)
  const currentCardsAfterSearch = state.results.slice(firstCardIndex, lastCardIndex)

  return (
    <Page title="اساتید" wide={true}>
      <div className="row">
        <div className="col-12">
          <div className="heading-section">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-4 direction">
                <select onChange={handleGroup} id="group" className="form-control select-bar">
                  {groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <div className="form direction">
                  <i className="fa fa-search direction"></i>
                  <input onChange={handleInput} type="text" className="form-control form-input" placeholder="نام استاد را وارد کنید..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"circle-loader " + (state.show == "loading" ? "circle-loader--visible" : "")}></div>
      {state.show == "neither" && (
        <>
          <HomeCards cards={currentCardsBeforSearch} />
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"activeP"}
            pageClassName={"page-item"}
            onPageChange={event => {
              setCurrentPage(event.selected + 1)
            }}
            breakLabel="..."
            pageCount={Math.ceil(cards.length / cardsPerPage)}
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </>
      )}
      {state.show == "results" && (
        <>
          <HomeCards cards={currentCardsAfterSearch} />
          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            onPageChange={event => {
              setCurrentPage(event.selected + 1)
            }}
            breakLabel="..."
            pageCount={Math.ceil(state.results.length / cardsPerPage)}
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </>
      )}
    </Page>
  )
}

export default Home
