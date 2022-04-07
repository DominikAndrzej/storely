export class RouteHelper {

    public static isInHomeView(): boolean {
        return !RouteHelper.isInLoginRequiredView() && (window.location.hash.indexOf('company=') === -1);
    }

    public static isInLoginRequiredView(): boolean {
        return window.location.hash.indexOf('loggedout') !== -1;
    }
}