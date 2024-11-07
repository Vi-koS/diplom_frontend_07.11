import { FC, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ISneakers } from "../../../slices/sneakersSlice";
import { postBasket } from "../../../slices/basketSlice";
import { AppDispatch } from "../../../store";
import { Link } from "react-router-dom";

interface IProps {
  item: ISneakers;
}

const CatalogCard: FC<IProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <CatalogCardStyle
      $isOpenModal={isOpenModal}
      onClick={() => setIsOpenModal((prev) => !prev)}
    >
      <div className={isOpenModal ? "modal modal-open" : "modal"}>
        <div className="options">
          <Link to={`/product/${item.id}`} className="btn">
          <img src="./public/sneaker.png" alt="sneaker" />
          </Link>
          <button className="add" onClick={() => dispatch(postBasket(item))}>
            <img src="./public/basket.png" alt="add to basket" />
          </button>

        </div>
        <picture>
          <img src={item.imgUrl} alt={item.title} />
        </picture>
      </div>
      <h3>{item.title}</h3>
      <p>{item.price} ₽</p>
      <p>{item.gender}</p>
    </CatalogCardStyle >
  );
};

const CatalogCardStyle = styled.li<{ $isOpenModal: boolean }>`
  .modal {
    position: relative;
  }

  .options {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    background: rgba(255, 255, 255, 0.6);
    opacity: 0;
    transition: all 200ms linear;

    button {
      width: 80px;
      height: 80px;
      border-radius: 50%;

      @media (min-width: 810px) {
        &:hover {
          background-color: rgb(49, 52, 60);
        }
      }
    }
  }

  @media (min-width: 810px) {
    &:hover .options {
      opacity: 1;
    }
  }

  @media (max-width: 810px) {
    .options {
      opacity: ${(props) => (props.$isOpenModal ? 1 : 0)};
    }
  }

  picture {
    max-width: 280px;
    height: 293px;
    display: inline-block;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h3 {
    margin-bottom: 6px;
    color: rgb(68, 75, 88);
    font-size: 16px;
    line-height: 19px;
  }

  p {
    color: rgb(68, 75, 88);
    font-family: "IntroRegular", sans-serif;
    font-size: 20px;
    line-height: 20px;
  }
`;

export default CatalogCard;
