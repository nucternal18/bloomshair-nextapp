import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import UpdateProfileForm from "../UpdateProfileForm";

describe("UpdateProfileForm", () => {
  it("Should render", () => {
    const submitHandler = jest.fn();
    const handleSubmit = jest.fn();
    const error = "";
    const register = jest.fn();
    render(
      <UpdateProfileForm
        userData={{
          name: "John Doe",
          email: "jdoe@test.com",
          password: "123456789",
          image: "/bloomslogo512x512.png",
        }}
        submitHandler={submitHandler}
        image={"/bloomslogo512x512.png"}
        uploading={false}
        handleSubmit={handleSubmit}
        uploadError={"Error Uploading"}
        register={register}
        errors={error}
        uploadFileHandler={jest.fn()}
      />
    );
    const view = screen.getByLabelText("update-profile-form");
    expect(view).toBeInTheDocument();
  });
});
