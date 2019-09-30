import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

// withRouter: when we want to access a router that we do not have an access, we use withRouter, which grants access to all stuffs the router does
export default withRouter(({ history }) => {
  
  // React Hook? 좀 더 공부해야함. useInput은 search, onchange, value를 return합니다.
  // 우리 경우엔 검색창 안에 입력한걸로 search해야하니 search.value를 사용.
    const search = useInput(""); 
  const { data } = useQuery(ME); // 자기 자신의 username을 가져오는 query입니다. 유저가 보낸 토큰을 기반으로 사용자의 사용자명을 return합니다.


  const onSearchSubmit = e => {
    // Search를 눌렀을 때, `/search?term=${search.value}`로 갑니다. Search component를 불러오는거죠.
    // 근데 이 과정에서 페이지가 새로고침되길 우린 원하지 않으니 e.preventDefault();를 해줍니다.
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.me ? (
            <HeaderLink to="/user/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={`/user/${data.me.username}`}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
