import Pagination from "react-js-pagination"
import { styled } from "styled-components";

export const Paging = ({ currentPage, totalItems, setCurrentPage }) => {
  return (
    <StyledPageContainer>
      <Pagination 
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        prevPageText={`<`}
        nextPageText={`>`}
        onChange={setCurrentPage}
      />
    </StyledPageContainer>
  )
};

const StyledPageContainer = styled.div`
  .pagination {
    display: flex;
    margin-top: 15px;
  }
 
  ul {
    list-style: none;
    padding: 0;
  }
 
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
 
  ul.pagination li a {
    text-decoration: none;
    color: #9c89b2;
    font-size: 1rem;
  }
 
  ul.pagination li.active a {
    color: white;
  }
 
  ul.pagination li.active {
    background-color: #9c89b2;
  }
 
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
 
  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;