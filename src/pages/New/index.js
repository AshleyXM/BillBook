import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const New = () => {
  const navigate = useNavigate();

  const [billType, setBillType] = useState("pay");
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Add a Bill
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" && "selected")}
            onClick={() => setBillType("pay")}
          >
            Cost
          </Button>
          <Button
            shape="rounded"
            className={classNames(billType === "income" && "selected")}
            onClick={() => setBillType("income")}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{"Today"}</span>
              <DatePicker
                className="kaDate"
                title="Bill Date"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input className="input" placeholder="0.00" type="number" />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div className={classNames("item", "")} key={item.type}>
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save">Save</Button>
      </div>
    </div>
  );
};

export default New;
