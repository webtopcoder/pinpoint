import React from "react";
import Link from "next/link";
import { Radio, Divider } from 'antd';
import UserPartnerLoginForm from "./UserPartner/Form";
import AssistantForm from "./Assistant/Login";
import useMedia from "@/hooks/useMedia";


const options = [
  {
    label: 'As a User',
    value: 'user',
  },
  {
    label: 'As a Partner',
    value: 'partner',
  },
  {
    label: 'As an Assistant',
    value: 'assistant',
  },
];

const LoginForm = ({ option, onChangeRole }) => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <div className="col-lg-6 col-md-12">
      <div className="login-form">
        <Radio.Group
          size={isWebDevice ? 'large' : 'small'}
          options={options}
          onChange={(e) => onChangeRole(e)}
          value={option}
          optionType="button"
          buttonStyle="solid"
          style={{
            width: '100%',
            marginBottom: 20
          }}
        />
        {option === "assistant" ?
          <AssistantForm option={option} /> : <UserPartnerLoginForm option={option} />}
        <Divider />
        <div className="col-12">
          <p className="account-desc">
            Don't have an account?
            <Link href={`/auth/signup`}>
              <a>{"  "}Sign Up{"  "}</a>
            </Link>{" "}
            here for free!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
