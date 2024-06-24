import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";

import { useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    // 返回计算得到的结果
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);

  // 控制时间的显示
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs(new Date()).format("YYYY-MM")
  );

  const handleDateConfirm = (date) => {
    setDateVisible(false);
    // 其他处理逻辑
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
  };
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}</span>
            {/* 根据当前弹框的打开状态控制expand类名的存在与否 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={handleDateConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
