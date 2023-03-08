//import './side.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ReactPaginate from 'react-paginate';
import {
    useState,
    useEffect
} from 'react';
import './side.css'
const Side = () => {
    const [pager, setpager] = useState('none');

    const [icn, seticn] = useState(<ArrowRightIcon style={{ color: "black" }} />);
    const items = [...Array(51).keys()];

    function Items({ currentItems }) {
        return (
            <div className="items">
                {currentItems && currentItems.map((item) => (
                    <div>
                        <img
                            src={"https://achtuber25.github.io/VA_Memories/src/images/aditya/Av" + item + ".jpg"}
                            className="w-100 shadow-1-strong rounded mb-4"
                        />
                    </div>
                ))}
            </div>
        );
    }
    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % items.length;
            console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <div style={{
                    display: pager,
                    position: 'fixed',
                    bottom: "34px",
                    left: '0px',
                    justifyContent: "flex-end"
                }}>
                    <ReactPaginate

                        nextLabel="next>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<back"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel=".."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        );
    }
    const shortButton = () => {
        if (pager == 'none') {
            setpager('flex')
            seticn(<ArrowLeftIcon style={{ color: "black" }} />)
        }
        else {
            setpager('none')
            seticn(<ArrowRightIcon style={{ color: "black" }} />)
        }
    }

    return (

        <>
            <div className="menu" style={{
                display: pager,
                position: "fixed",
                borderRadius: "0px 15px 15px 0px",
                top: "120px",
                left: "0px",
                Width: "100px",
                height: "68vh",
                color: "#2e0006",
                backgroundColor: "#0d6efd",
                border: "1px solid grey",
            }}>
                <div className="main-menu default-transition" style={{ height: '100%', top: '124px' }}>
                    <a id="a-menu-button" href="#" className="menu-button d-none d-md-block">
                        <i className="fa fa-chevron-left" />
                    </a>
                    <a id="a.menu-button" href="#" className="menu-button-mobile d-xs-block d-sm-block d-md-none">
                        <i className="fa fa-chevron-left" />
                    </a>
                    <div className="scroll ps" >
                        <ul className="list-unstyled" >
                            <li className="active" style={{ paddingTop: "30px", paddingBottom: "50px" }}>
                                <span>👦</span>
                            </li>
                            <li style={{ paddingBottom: "50px" }}>
                                <span>👩</span>
                            </li>
                            <li style={{ paddingBottom: "30px" }}>
                                <span>👦👩</span>

                            </li>

                        </ul>

                    </div>
                </div>
            </div>
            <PaginatedItems itemsPerPage={4} />,

            <button style={{
                display: 'flex',
                position: "fixed",
                width: '50px',
                borderRadius: "5px 15px 15px 5px",
                top: "90px",
                left: '0px',
                color: "#2e0006",
                border: "1px solid black",
                backgroundColor: "#0d6efd",
            }}
                onClick={shortButton}
            > {icn} </button>
        </>
    );
}
export default Side

