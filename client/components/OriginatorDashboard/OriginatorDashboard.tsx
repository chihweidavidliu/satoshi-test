import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import AsyncSelect from "react-select/async";
import { IUser } from "../../types/IUser";
import { Button } from "../Button";

const DashboardWrapper = styled.div`
  width: 90vw;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    width: auto;
    padding: 30px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  padding: 30px;
`;

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 15px;
  font-size: 24px;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 36px;
  }
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 20px;
  color: white;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 36px;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-gap: 30px;
`;

const loadOptions = async (inputValue: string) => {
  const response = await axios.get(
    `/api/enrolment/producers?email=${inputValue}`
  );

  return response.data.map((user: IUser) => ({
    value: user.id,
    label: user.email,
    user: user,
  }));
};

const loadOptionsDebounced = AwesomeDebouncePromise(loadOptions, 500);

interface IOption {
  value: string;
  label: string;
  user: IUser;
}

interface IOriginatorDashboardProps {
  currentUser: IUser;
}

const OriginatorDashboard = ({ currentUser }: IOriginatorDashboardProps) => {
  const [selectedProducer, setSelectedProducer] = useState<IOption | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");

  return (
    <DashboardWrapper>
      <TitleWrapper>
        <H1>Enrol in M+</H1>
        <p>{`Welcome ${currentUser.name}`}</p>

        <ButtonGrid>
          <Link href={"/new-producer"}>
            <Button isUpperCase isFullWidth>
              <H2>Add new customer</H2>
            </Button>
          </Link>

          <AsyncSelect
            onFocus={() => setSelectedProducer(null)}
            isSearchable
            placeholder="Find current customer"
            value={selectedProducer}
            onChange={(selectedProducer) =>
              setSelectedProducer(selectedProducer as IOption)
            }
            onInputChange={(newValue: string) => setInputValue(newValue)}
            loadOptions={() => loadOptionsDebounced(inputValue)}
            noOptionsMessage={() => "No Matches Found"}
          />

          <Link href={"/enrol"}>
            <Button isUpperCase isFullWidth disabled={!selectedProducer}>
              <H2>Start Enrolment</H2>
            </Button>
          </Link>
        </ButtonGrid>
      </TitleWrapper>
    </DashboardWrapper>
  );
};

export default OriginatorDashboard;
