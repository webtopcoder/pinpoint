import { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import { usePasswordFormValidator } from "../../Auth/User/hooks/use-user-password-form-validator";
import { settingService } from "@/services/index";

const NotificationSetting = () => {

    const [settings, setSettings] = useState();
    const { notify } = useNotify();

    async function getSettingUsers() {
        const result = await settingService.GetSettingsValue();
        await setSettings(
            result?.results?.reduce(
                (acc, obj) => ({ ...acc, [obj.key]: obj.value }),
                {}
            )
        );
    }

    async function optionToggle(option, keyName) {
        const data = {
            key: `user:${keyName}`,
            value: option.target.checked,
        };

        await settingService.SettingsToggle(data).then(() => {
            getSettingUsers();
        })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });;
    };
    useEffect(() => {
        getSettingUsers();
    }, []);

    return (
        <>
            <form>
                <div className="row">
                    <div className="auth-space desktop"></div>
                    <div className="col-lg-10 col-md-6">
                        <div
                            className="form-check form-switch form-switch-lg mb-3"
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="friend"
                                checked={
                                    settings && settings["user:followRequest"] ? true : false
                                }
                                onChange={(checked) => {
                                    optionToggle(checked, "followRequest");
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="friend"
                            >
                                Friend Requests
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-6">
                        <div
                            className="form-check form-switch form-switch-lg mb-3"
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="inbox"
                                checked={
                                    settings && settings["user:message"] ? true : false
                                }
                                onChange={(checked) => {
                                    optionToggle(checked, "message");
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inbox"
                            >
                                Mail Inbox
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-6">
                        <div
                            className="form-check form-switch form-switch-lg mb-3"
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="like"
                                checked={
                                    settings && settings["user:likeCommentRating"] ? true : false
                                }
                                onChange={(checked) => {
                                    optionToggle(checked, "likeCommentRating");
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="like"
                            >
                                Likes
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-6">
                        <div
                            className="form-check form-switch form-switch-lg mb-3"
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="favorite"
                                checked={
                                    settings && settings["user:location"] ? true : false
                                }
                                onChange={(checked) => {
                                    optionToggle(checked, "location");
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="favorite"
                            >
                                Favorite Location Goes Active
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-6">
                        <div
                            className="form-check form-switch form-switch-lg mb-3"
                        >
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="comment"
                                checked={
                                    settings && settings["user:mention"] ? true : false
                                }
                                onChange={(checked) => {
                                    optionToggle(checked, "mention");
                                }}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="comment"
                            >
                                Comments
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NotificationSetting;
