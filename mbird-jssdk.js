var MBirdSdk;
(function (MBirdSdk) {
    var _canBeClosed;
    var _canReceiveChannelContent;
    function isConnected() {
        var sdkHandler = window["JavaScriptSdkHandlerFullAsync"];
        return (sdkHandler !== null);
    }
    MBirdSdk.isConnected = isConnected;
    function SdkVersion() {
        return "7.0.0";
    }
    MBirdSdk.SdkVersion = SdkVersion;
    class Base {
        static executeCommand(command) {
            var sdkHandler = window["JavaScriptSdkHandlerFullAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithCommand(command, (response) => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
        static executeNumber(command, value) {
            var sdkHandler = window["JavaScriptSdkHandlerFullAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithNumber(command, value, (response) => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
        static executeString(command, content) {
            var sdkHandler = window["JavaScriptSdkHandlerFullAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeWithString(command, content, (response) => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
        static executeIoCommand(command, parameters, content) {
            var sdkHandler = window["JavaScriptSdkHandlerFullAsync"];
            return new Promise((resolve) => {
                sdkHandler.executeIoCommand(command, parameters, content, (response) => {
                    var responseParsed = "";
                    try {
                        responseParsed = JSON.parse(response);
                    }
                    catch (ex) {
                        resolve(response);
                    }
                    if (sdkHandler && command != null) {
                        try {
                            var obj = JSON.parse(responseParsed.toString());
                            resolve(obj);
                        }
                        catch (ex) {
                            resolve(responseParsed);
                        }
                    }
                    resolve(response);
                });
            });
        }
    }
    class Admin extends Base {
        static Open() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("OpenAdmin").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Admin = Admin;
    class App extends Base {
        static Hide() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("Hide").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static GetDetails() {
            console.warn("App.GetDetails will be deprecated in the future, use Settings.AppDetails instead");
            return Settings.AppDetails();
        }
        static GetToken() {
            console.warn("App.GetToken will be deprecated in the future, use Settings.GetToken instead");
            return Settings.GetToken();
        }
        static WriteLog(message, isError) {
            return new Promise((resolve, reject) => {
                if (message == null || message.length === 0) {
                    reject("Log message is empty!");
                    return;
                }
                var obj = {
                    message: message,
                    isError: isError
                };
                Base.executeString("WriteLog", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static DeveloperTools() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("ShowDevTools").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static BrowserVersion() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetBrowserVersion").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OnInactivity(callback) {
            console.warn("App.OnInactivity will be deprecated in the future, use Callbacks.Inactivity instead");
            return Callbacks.Inactivity(callback);
        }
    }
    MBirdSdk.App = App;
    class Callbacks extends Base {
        static Inactivity(callback) {
            CallbacksManager.On("Inactivity", callback);
        }
    }
    MBirdSdk.Callbacks = Callbacks;
    class ChannelCallbacks extends Base {
        static CanReceiveChannelContent(callback) {
            _canReceiveChannelContent = callback;
        }
        static ChannelContentReceived(callback) {
            CallbacksManager.On("ChannelCallbacks.ChannelContentReceived", callback);
        }
    }
    MBirdSdk.ChannelCallbacks = ChannelCallbacks;
    class SingleAppCallbacks extends Base {
        static CanBeClosed(callback) {
            _canBeClosed = callback;
        }
    }
    MBirdSdk.SingleAppCallbacks = SingleAppCallbacks;
    class UserInterface extends Base {
        static CloseButton(alignment, imageBase64, xPadding, yPadding) {
            return new Promise((resolve, reject) => {
                if (alignment == null) {
                    reject("Alignment type cannot be null!");
                    return;
                }
                var obj = {
                    xPadding: xPadding,
                    yPadding: yPadding,
                    alignment: UIAlignment[alignment],
                    imageBase64: imageBase64
                };
                Base.executeString("UIChangeCloseButton", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.UserInterface = UserInterface;
    class Core extends Base {
        static DeveloperTools() {
            console.warn("Core.DeveloperTools will be deprecated in the future, use App.DeveloperTools instead");
            return App.DeveloperTools();
        }
        static BrowserVersion() {
            console.warn("Core.BrowserVersion will be deprecated in the future, use App.BrowserVersion instead");
            return App.BrowserVersion();
        }
        static OpenAdmin() {
            console.warn("Core.OpenAdmin is deprecated, please use Admin.Open instead!");
            return Admin.Open();
        }
        static GetVolume() {
            console.warn("Core.GetVolume is deprecated, please use Volume.Get instead!");
            return Volume.Get();
        }
        static GetWeather() {
            console.warn("Core.GetWeather is deprecated, please use Weather.Current instead!");
            return Weather.Current();
        }
        static UpdateVolume(value) {
            console.warn("Core.UpdateVolume is deprecated, please use Volume.Update instead!");
            return Volume.Update(value);
        }
        static Hide() {
            console.warn("Core.Hide is deprecated, please use App.Hide instead!");
            return App.Hide();
        }
        static CallbackWithResponse(message, params) {
            switch (message) {
                case "SingleAppCallbacks.CanBeClosed":
                    {
                        return _canBeClosed.call(params);
                    }
                case "ChannelCallbacks.CanReceiveChannelContent":
                    {
                        return _canReceiveChannelContent.call(params);
                    }
            }
            return null;
        }
        static Callback(message, params) {
            var response;
            switch (message) {
                case "BundlesettingsChanged":
                    {
                        CallbacksManager.Trigger("BundlesettingsChanged", null);
                        break;
                    }
                case "KioskSettingsChanged":
                    {
                        CallbacksManager.Trigger("KioskSettingsChanged", null);
                        break;
                    }
                case "StoreSettingsChanged":
                    {
                        CallbacksManager.Trigger("StoreSettingsChanged", null);
                        break;
                    }
                case "PayProgress":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("PayProgress", response);
                        break;
                    }
                case "NewMessage":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("NewMessage", response);
                        break;
                    }
                case "WingsNewMessage":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("WingsNewMessage", response);
                        break;
                    }
                case "AsyncResponse":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("WingsNewMessage", response);
                        break;
                    }
                case "Inactivity":
                    {
                        CallbacksManager.Trigger("Inactivity");
                        break;
                    }
                case "ChannelCallbacks.ChannelContentReceived":
                    {
                        CallbacksManager.Trigger("ChannelCallbacks.ChannelContentReceived");
                        break;
                    }
                case "ConsumptionCallbacks.Warning":
                    {
                        CallbacksManager.Trigger("ConsumptionCallbacks.Warning", params);
                        break;
                    }
                case "ConsumptionCallbacks.LastCall":
                    {
                        CallbacksManager.Trigger("ConsumptionCallbacks.LastCall", params);
                        break;
                    }
                case "EventRaised":
                    {
                        try {
                            response = JSON.parse(params);
                        }
                        catch (ex) {
                            response = params;
                        }
                        CallbacksManager.Trigger("EventRaised", response);
                        break;
                    }
            }
        }
    }
    MBirdSdk.Core = Core;
    class Board extends Base {
        static ShowNotification(title, message, notificationType, switchToAppIdentifier, fullNotification) {
            console.warn("Board.ShowNotification is deprecated, please use Notification.Show instead!");
            return Notification.Show(title, message, notificationType, switchToAppIdentifier, fullNotification);
        }
        static GetInfo() {
            console.warn("Board.GetInfo is deprecated, please use Settings.GetToken and Settings.GetCapabilities instead!");
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetInfo").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Capabilities() {
            console.warn("Board.GetInfo is deprecated, please use Settings.GetToken and Settings.GetCapabilities instead!");
            return Settings.GetCapabilities();
        }
        static Tags() {
            console.warn("Board.Tags is deprecated, please use Environment.Tags instead!");
            return Environment.Tags();
        }
        static GetWorkingHours() {
            console.warn("Board.GetWorkingHours is deprecated, please use Environment.WorkingHours instead!");
            return Environment.WorkingHours();
        }
    }
    MBirdSdk.Board = Board;
    class Weather extends Base {
        static Current() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetWeather").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Weather = Weather;
    class Volume extends Base {
        static Update(value) {
            return new Promise((resolve, reject) => {
                if (value == null || value.length === 0) {
                    reject("Value cannot be null or empty!");
                    return;
                }
                Base.executeNumber("UpdateVolume", parseInt(value)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Get() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetVolume").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(Number(response.Result));
                });
            });
        }
    }
    MBirdSdk.Volume = Volume;
    class Notification extends Base {
        static Show(title, message, notificationType, switchToAppIdentifier, fullNotification) {
            return new Promise((resolve, reject) => {
                if (title == null || title.trim().length === 0) {
                    reject("Notification title is empty");
                    return;
                }
                if (message == null || message.trim().length === 0) {
                    reject("Notification message is empty");
                    return;
                }
                var notificationTypeValue = "message";
                if (notificationType === NotificationType.HtmlContent)
                    notificationTypeValue = "htmlcontent";
                if (notificationType === NotificationType.HtmlFile)
                    notificationTypeValue = "htmlfile";
                if (notificationType === NotificationType.WarningMessage)
                    notificationTypeValue = "warning_message";
                if (notificationType === NotificationType.InfoMessage)
                    notificationTypeValue = "info_message";
                var obj = {
                    title: title,
                    message: message,
                    switchToAppIdentifier: switchToAppIdentifier,
                    notificationType: notificationTypeValue,
                    fullNotification: fullNotification
                };
                Base.executeString("ShowNotification", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static SwitchToApp(appIdentifier) {
            return new Promise((resolve, reject) => {
                if (appIdentifier == null || appIdentifier.length === 0) {
                    reject("AppIdentifier cannot be null or empty!");
                    return;
                }
                Base.executeString("SwitchToApp", appIdentifier).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Notification = Notification;
    class IOBoard extends Base {
        static ExecuteCommand(commandType, params, ioBoardName = "") {
            return new Promise((resolve, reject) => {
                if (commandType == null) {
                    reject("Command type cannot be null!");
                    return;
                }
                var obj = {
                    commandType: IOBoardCommandType[commandType],
                    params: params,
                    IOBoardName: ioBoardName
                };
                Base.executeString("ExecuteIOBoardCommand", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Status() {
            return new Promise((resolve, reject) => {
                Base.executeString("IOBoard.Status").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.IOBoard = IOBoard;
    class Scanner extends Base {
        static Scan(value, scannerName = "") {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                if (scannerName == null || scannerName == "") {
                    Base.executeNumber("Scan", value).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(response.Result);
                    });
                }
                else {
                    var obj = {
                        ScannerName: scannerName,
                        Value: value
                    };
                    Base.executeString("ScanWithName", JSON.stringify(obj)).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(response.Result);
                    });
                }
            });
        }
    }
    MBirdSdk.Scanner = Scanner;
    class Nfc extends Base {
        static Read(value) {
            console.warn("Nfc.Read will be deprecated in the future, use NfcReader.Read instead");
            return NfcReader.Read(value);
        }
        static ReadFileInfo(value, applicationId, authenticationKey) {
            console.warn("Nfc.ReadFileInfo will be deprecated in the future, use NfcReader.FileInfo instead");
            return NfcReader.FileInfo(value, applicationId, authenticationKey);
        }
    }
    MBirdSdk.Nfc = Nfc;
    class NfcReader extends Base {
        static Read(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                Base.executeNumber("NfcRead", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static FileInfo(value, applicationId, authenticationKey) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                if (applicationId.trim().length === 0) {
                    reject("Application Id is empty");
                    return;
                }
                if (authenticationKey.trim().length === 0) {
                    reject("Authentication Key is empty");
                    return;
                }
                var obj = {
                    ApplicationID: applicationId.trim(),
                    AuthenticationKey: authenticationKey.trim(),
                    Seconds: value
                };
                Base.executeString("NfcReadFileInfo", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.NfcReader = NfcReader;
    class MagReader extends Base {
        static Read(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                Base.executeNumber("MagReader.Read", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.MagReader = MagReader;
    class Camera extends Base {
        static Snapshot() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("CameraSnapshot").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Camera = Camera;
    class FiscalPrinter extends Base {
        static PrintFiscalTicket(value, fiscalPrinterReceipts, hasCustomerReceipt, printPayReceiptsFirst) {
            return new Promise((resolve, reject) => {
                try {
                    JSON.parse(value);
                }
                catch (e) {
                    reject("The ticket text is not a valid JSON");
                    return;
                }
                var objWithName = {
                    content: value,
                    fiscalPrinterReceipts: fiscalPrinterReceipts,
                    hasCustomerReceipt: hasCustomerReceipt,
                    printPayReceiptsFirst: printPayReceiptsFirst
                };
                Base.executeString("FiscalPrinter.PrintFiscalTicketWithParams", JSON.stringify(objWithName)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.FiscalPrinter = FiscalPrinter;
    class Printer extends Base {
        static TagContent(value, name = "") {
            console.warn("Printer.TagContent will be deprecated in the future, use Printer.PrintTagContent instead");
            return Printer.PrintTagContent(value, name);
        }
        static PrintTagContent(value, name = "") {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Print text cannot be empty");
                    return;
                }
                if (name.trim() === "") {
                    Base.executeString("PrintTagContent", value).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(true);
                    });
                }
                else {
                    var objWithName = {
                        Value: value,
                        PrinterName: name
                    };
                    Base.executeString("PrintTagContentWithName", JSON.stringify(objWithName)).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(true);
                    });
                }
            });
        }
        static SaveReceiptTagContent(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Print text cannot be empty");
                    return;
                }
                Base.executeString("Printer.SaveReceiptTagContent", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    MBirdSdk.Printer = Printer;
    class Scale extends Base {
        static MeasureWeight(value) {
            return new Promise((resolve, reject) => {
                if (value == null) {
                    reject("Timeout seconds is invalid");
                    return;
                }
                Base.executeNumber("MeasureWeight", value).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Scale = Scale;
    class Peripherals extends Base {
        static Status() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralsStatus").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StatusDetails() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralsStatusDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Details() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetPeripheralDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Peripherals = Peripherals;
    class Payment extends Base {
        static Pay(amount, transactionReference, name = "", params = null) {
            return new Promise((resolve, reject) => {
                if (Number.isInteger(amount) == false) {
                    reject({
                        Error: "Pay error",
                        Description: "The amount must be an integer, current value: " + amount
                    });
                    return;
                }
                if (amount <= 0) {
                    reject({
                        Error: "Pay error",
                        Description: "The amount must be greater than 0, current value: " + amount
                    });
                    return;
                }
                var obj = {
                    Amount: amount.toString(),
                    TransactionReference: transactionReference,
                    Params: params
                };
                if (name.trim() === "") {
                    Base.executeString("Pay", JSON.stringify(obj)).then((response) => {
                        if (response.Error) {
                            reject({
                                Error: response.Error,
                                Description: response.Description
                            });
                            return;
                        }
                        resolve(response.Result);
                    });
                }
                else {
                    var objWithName = {
                        PayRequest: obj,
                        PaymentName: name
                    };
                    Base.executeString("PayWithName", JSON.stringify(objWithName)).then((response) => {
                        if (response.Error) {
                            reject({
                                Error: response.Error,
                                Description: response.Description
                            });
                            return;
                        }
                        resolve(response.Result);
                    });
                }
            });
        }
        static ElectronicPay(amount, transactionReference, name = "", params = null) {
            return new Promise((resolve, reject) => {
                if (Number.isInteger(amount) == false) {
                    reject({
                        Error: "Pay error",
                        Description: "The amount must be an integer, current value: " + amount
                    });
                    return;
                }
                if (amount <= 0) {
                    reject({
                        Error: "Pay error",
                        Description: "The amount must be greater than 0, current value: " + amount
                    });
                    return;
                }
                var obj = {
                    PayRequest: {
                        Amount: amount.toString(),
                        TransactionReference: transactionReference,
                        Params: params
                    },
                    PaymentName: name
                };
                Base.executeString("ElectronicPay", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject({
                            Error: response.Error,
                            Description: response.Description
                        });
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GetAcceptedCurrencies(name = "") {
            return new Promise((resolve, reject) => {
                var obj = {
                    PaymentName: name
                };
                Base.executeString("GetAcceptedCurrencies", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject({
                            Error: response.Error,
                            Description: response.Description
                        });
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StartAcceptMoney(name = "") {
            return new Promise((resolve, reject) => {
                var obj = {
                    PaymentName: name
                };
                Base.executeString("StartAcceptMoney", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject({
                            Error: response.Error,
                            Description: response.Description
                        });
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static EndAcceptMoney(amountToBeKept, name = "", params = null) {
            return new Promise((resolve, reject) => {
                if (Number.isInteger(amountToBeKept) == false) {
                    reject({
                        Error: "Pay error",
                        Description: "The amount must be an integer, current value: " + amountToBeKept
                    });
                    return;
                }
                var obj = {
                    PayRequest: {
                        Amount: amountToBeKept.toString(),
                        Params: params
                    },
                    PaymentName: name
                };
                Base.executeString("EndAcceptMoney", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject({
                            Error: response.Error,
                            Description: response.Description
                        });
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static OnProgress(callback) {
            console.warn("Payment.OnProgress will be deprecated in the future, use PaymentCallbacks.PayProgress instead");
            PaymentCallbacks.PayProgress(callback);
        }
    }
    MBirdSdk.Payment = Payment;
    class PaymentCallbacks extends Base {
        static PayProgress(callback) {
            CallbacksManager.On("PayProgress", callback);
        }
    }
    MBirdSdk.PaymentCallbacks = PaymentCallbacks;
    class TraceTimeline extends Base {
        static Start() {
            return new Promise((resolve, reject) => {
                Base.executeString("Trace.TraceTimeline.Start").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Add(traceIdentifier, type) {
            return new Promise((resolve, reject) => {
                var data = {
                    TraceIdentifier: traceIdentifier,
                    Type: type
                };
                Base.executeString("Trace.TraceTimeline.Add", JSON.stringify(data)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Stop(traceIdentifier) {
            return new Promise((resolve, reject) => {
                Base.executeString("Trace.TraceTimeline.Stop", traceIdentifier).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
    }
    class Trace extends Base {
        static AddTransaction(transactionWasSuccessful, transactionReference) {
            return new Promise((resolve, reject) => {
                if (transactionWasSuccessful == null) {
                    reject("You must specify if transaction was successful or not");
                    return;
                }
                var transaction = {
                    TransactionWasSuccessful: transactionWasSuccessful,
                    TransactionReference: transactionReference
                };
                Base.executeString("TraceTransaction", JSON.stringify(transaction)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static AddEvent(event) {
            return new Promise((resolve, reject) => {
                try {
                    JSON.parse(event);
                }
                catch (e) {
                    reject("Event is not a valid JSON");
                    return;
                }
                Base.executeString("TraceEvent", event).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static AddAlert(alertType, emailSubject, emailBody, details) {
            return new Promise((resolve, reject) => {
                try {
                    if (details !== "")
                        JSON.parse(details);
                }
                catch (e) {
                    reject("Details is not a valid JSON");
                    return;
                }
                var alert = {
                    AlertType: alertType,
                    EmailSubject: emailSubject,
                    EmailBody: emailBody,
                    Details: details
                };
                Base.executeString("AddAlert", JSON.stringify(alert)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static AddStatus(status) {
            return new Promise((resolve, reject) => {
                try {
                    JSON.parse(status);
                }
                catch (e) {
                    reject("Status is not a valid JSON");
                    return;
                }
                Base.executeString("TraceStatus", status).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Transaction(transactionWasSuccessful, transactionReference) {
            console.warn("Trace.Transaction will be deprecated in the future, use Trace.AddTransaction instead");
            return Trace.AddTransaction(transactionWasSuccessful, transactionReference);
        }
        static Event(event) {
            console.warn("Trace.Event will be deprecated in the future, use Trace.AddEvent instead");
            return Trace.AddEvent(JSON.stringify(event));
        }
        static Status(status) {
            console.warn("Trace.Status will be deprecated in the future, use Trace.AddStatus instead");
            return Trace.AddStatus(JSON.stringify(status));
        }
    }
    Trace.Timeline = TraceTimeline;
    MBirdSdk.Trace = Trace;
    class BundleSettings extends Base {
        static Kiosk() {
            console.warn("BundleSettings.Kiosk will be deprecated in the future, use Settings.KioskSettings instead");
            return Settings.KioskSettings();
        }
        static Store() {
            console.warn("BundleSettings.Store will be deprecated in the future, use Settings.StoreSettings instead");
            return Settings.StoreSettings();
        }
        static App() {
            console.warn("BundleSettings.App will be deprecated in the future, use Settings.BundleSettings instead");
            return Settings.BundleSettings();
        }
        static OnAppSettingsChanged(callback) {
            console.warn("BundleSettings.OnAppSettingsChanged will be deprecated in the future, use BundleSettingsCallbacks.BundlesettingsChanged instead");
            BundleSettingsCallbacks.BundlesettingsChanged(callback);
        }
    }
    MBirdSdk.BundleSettings = BundleSettings;
    class Settings extends Base {
        static KioskSettings() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetKioskSettings").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StoreSettings() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetStoreSettings").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static BundleSettings() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetBundleSettingsLive").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GetToken() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetToken").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GetCapabilities() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("Capabilities").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static AppDetails() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetAppDetails").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Settings = Settings;
    class BundleSettingsCallbacks extends Base {
        static BundlesettingsChanged(callback) {
            CallbacksManager.On("BundlesettingsChanged", callback);
        }
        static KioskSettingsChanged(callback) {
            CallbacksManager.On("KioskSettingsChanged", callback);
        }
        static StoreSettingsChanged(callback) {
            CallbacksManager.On("StoreSettingsChanged", callback);
        }
    }
    MBirdSdk.BundleSettingsCallbacks = BundleSettingsCallbacks;
    class Sharing extends Base {
        static Register(name) {
            console.warn("Sharing.Register will be deprecated in the future, use Tweet.Register instead");
            return Tweet.Register(name);
        }
        static Discover(friendApps) {
            console.warn("Sharing.Discover will be deprecated in the future, use Tweet.Discover instead");
            return Tweet.Discover(friendApps);
        }
        static Message(destination, message, waitForAnswer) {
            console.warn("Sharing.Message will be deprecated in the future, use Tweet.NewMessage instead");
            return Tweet.NewMessage(destination, message, waitForAnswer);
        }
        static OnNewMessage(callback) {
            console.warn("Sharing.OnNewMessage will be deprecated in the future, use TweetCallbacks.OnNewMessage instead");
            TweetCallbacks.OnNewMessage(callback);
        }
    }
    MBirdSdk.Sharing = Sharing;
    class Tweet extends Base {
        static Discover(friendApps) {
            return new Promise((resolve, reject) => {
                if (friendApps == null || friendApps.length === 0) {
                    reject("Friend apps cannot be empty!");
                    return;
                }
                Base.executeString("Discover", JSON.stringify(friendApps)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static DiscoverByTopic(topics) {
            return new Promise((resolve, reject) => {
                if (topics == null || topics.length === 0) {
                    reject("Topics cannot be empty!");
                    return;
                }
                Base.executeString("DiscoverByTopic", JSON.stringify(topics)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static NewMessage(destination, message, waitForAnswer) {
            return new Promise((resolve, reject) => {
                try {
                    JSON.parse(message);
                }
                catch (ex) {
                    reject("The message has to be a stringified JSON.");
                    return;
                }
                var obj = {
                    Destination: destination,
                    Message: message,
                    WaitForAnswer: waitForAnswer
                };
                Base.executeString("Message", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Register(name, topics) {
            return new Promise((resolve, reject) => {
                if (name == null || name.length === 0) {
                    reject("Name cannot be null or empty");
                    return;
                }
                if (topics && topics.length > 0) {
                    var obj = {
                        Context: name,
                        Topics: topics
                    };
                    Base.executeString("RegisterWithTopics", JSON.stringify(obj)).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(true);
                    });
                }
                else {
                    Base.executeString("Register", name).then((response) => {
                        if (response.Error) {
                            reject(response.Error);
                            return;
                        }
                        resolve(true);
                    });
                }
            });
        }
    }
    MBirdSdk.Tweet = Tweet;
    class TweetCallbacks extends Base {
        static OnNewMessage(callback) {
            CallbacksManager.On("NewMessage", callback);
        }
    }
    MBirdSdk.TweetCallbacks = TweetCallbacks;
    class SharingCallbacks extends Base {
        static NewMessage(callback) {
            console.warn("SharingCallbacks.OnNewMessage will be deprecated in the future, use TweetCallbacks.OnNewMessage instead");
            TweetCallbacks.OnNewMessage(callback);
        }
    }
    MBirdSdk.SharingCallbacks = SharingCallbacks;
    class Wings extends Base {
        static Status() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("WingsStatus").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Subscribe(topic) {
            return this.SubscribeTopics([topic]);
        }
        static SubscribeTopics(topics) {
            return new Promise((resolve, reject) => {
                if (topics == null || topics.length === 0) {
                    reject("Topic names cannot be empty");
                    return;
                }
                var obj = {
                    Topics: topics
                };
                Base.executeString("SubscribeTopics", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Unsubscribe(name) {
            return new Promise((resolve, reject) => {
                if (name == null || name.length === 0) {
                    reject("Topic name cannot be null or empty!");
                    return;
                }
                Base.executeString("Unsubscribe", name).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static Publish(message, topic, id) {
            return new Promise((resolve, reject) => {
                if (topic == null || topic.length === 0) {
                    reject("Topic name cannot be null or empty!");
                    return;
                }
                try {
                    JSON.parse(message);
                }
                catch (ex) {
                    reject("The message has to be a stringified JSON.");
                    return;
                }
                var obj = {
                    Topic: topic,
                    Message: message,
                    Id: id
                };
                Base.executeString("Publish", JSON.stringify(obj)).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(true);
                });
            });
        }
        static OnNewMessage(callback) {
            console.warn("Wings.OnNewMessage will be deprecated in the future, use WingsCallbacks.NewMessage instead");
            WingsCallbacks.NewMessage(callback);
        }
    }
    MBirdSdk.Wings = Wings;
    class WingsCallbacks extends Base {
        static NewMessage(callback) {
            CallbacksManager.On("WingsNewMessage", callback);
        }
    }
    MBirdSdk.WingsCallbacks = WingsCallbacks;
    class ConsumptionCallbacks extends Base {
        static Warning(callback) {
            CallbacksManager.On("ConsumptionCallbacks.Warning", callback);
        }
        static LastCall(callback) {
            CallbacksManager.On("ConsumptionCallbacks.LastCall", callback);
        }
    }
    MBirdSdk.ConsumptionCallbacks = ConsumptionCallbacks;
    class Environment extends Base {
        static About() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetEnvironmentAbout").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Tags() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("Tags").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static StoreTags() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("StoreTags").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static WorkingHours() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetWorkingHours").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static GeoLocation() {
            console.warn("Environment.GeoLocation will be deprecated in the future, use GeoLocation.Current instead");
            return GeoLocation.Current();
        }
    }
    MBirdSdk.Environment = Environment;
    class EventTriggers extends Base {
        static Register(events) {
            return new Promise((resolve, reject) => {
                if (events == null || events.length == 0) {
                    reject("events lists is empty");
                    return;
                }
                Base.executeString("EventsRegister", JSON.stringify({ events: events })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Unregister(events) {
            return new Promise((resolve, reject) => {
                debugger;
                if (events == null || events.length == 0) {
                    reject("events lists is empty");
                    return;
                }
                Base.executeString("EventTriggers.Unregister", JSON.stringify({ events: events })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static List() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("EventsList").then((response) => {
                    if (response.Error) {
                        var eventsNames = [];
                        for (var event in RegisteredEventType) {
                            var name = RegisteredEventType[event];
                            if (name.length > 2)
                                eventsNames.push(name);
                        }
                        resolve(eventsNames);
                        return;
                    }
                    resolve(response.Result.Events);
                });
            });
        }
        static OnEventRaised(callback) {
            CallbacksManager.On("EventRaised", callback);
        }
    }
    MBirdSdk.EventTriggers = EventTriggers;
    class GeoLocation extends Base {
        static Current() {
            return new Promise((resolve, reject) => {
                Base.executeCommand("GetEnvironmentGeoLocation").then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.GeoLocation = GeoLocation;
    class Directory extends Base {
        static Create(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("Directory.Create", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Delete(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("Directory.Delete", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static MoveTo(path, newPath) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                if (newPath == null || newPath.length === 0) {
                    reject("new path is empty");
                    return;
                }
                Base.executeIoCommand("Directory.MoveTo", JSON.stringify({ Path: path, NewPath: newPath })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Size(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("Directory.Size", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static List(path, filter) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("Directory.List", JSON.stringify({ Path: path, Filter: filter })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.Directory = Directory;
    class File extends Base {
        static Size(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.Size", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Delete(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.Delete", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Read(path) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.Read", JSON.stringify({ Path: path })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static Write(path, content, append = false) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.Write", JSON.stringify({ Path: path, TextContent: content, IsAppend: append })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static WriteBytes(path, content) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                var jssdkUrl = window["JSSDKUrl"];
                var xhr = new XMLHttpRequest();
                xhr.open("POST", jssdkUrl + "/jssdk/upload", true);
                xhr.setRequestHeader("Path", path);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        var responseParsed;
                        try {
                            responseParsed = JSON.parse(xhr.response);
                        }
                        catch (ex) {
                            responseParsed = xhr.response;
                        }
                        if (responseParsed.Error) {
                            reject(responseParsed.Error);
                            return;
                        }
                        resolve(responseParsed.Result);
                    }
                    ;
                };
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send(content);
            });
        }
        static MoveTo(path, newPath) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                if (newPath == null || newPath.length === 0) {
                    reject("new path is empty");
                    return;
                }
                Base.executeIoCommand("File.MoveTo", JSON.stringify({ Path: path, NewPath: newPath })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static CopyTo(path, newPath) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                if (newPath == null || newPath.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.CopyTo", JSON.stringify({ Path: path, NewPath: newPath })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
        static DownloadUrlTo(path, url) {
            return new Promise((resolve, reject) => {
                if (path == null || path.length === 0) {
                    reject("path is empty");
                    return;
                }
                if (url == null || url.length === 0) {
                    reject("path is empty");
                    return;
                }
                Base.executeIoCommand("File.DownloadUrlTo", JSON.stringify({ Path: path, Url: url })).then((response) => {
                    if (response.Error) {
                        reject(response.Error);
                        return;
                    }
                    resolve(response.Result);
                });
            });
        }
    }
    MBirdSdk.File = File;
    class CallbacksManager {
        static On(message, callback) {
            var msg = this.callbacks[message] || (this.callbacks[message] = new Callback(message));
            return msg.subscribe(callback);
        }
        static Off(callback, token) {
            if (this.callbacks[callback]) {
                (this.callbacks[callback]).unSubscribe(token);
            }
        }
        static Trigger(callback, payload) {
            if (this.callbacks[callback]) {
                (this.callbacks[callback]).notify(payload);
            }
        }
    }
    CallbacksManager.callbacks = {};
    class Subscription {
        constructor(id, callback) {
            this.id = id;
            this.callback = callback;
        }
    }
    class SharedFriendApp {
        constructor(AppIdentifier, Context) {
            this.AppIdentifier = AppIdentifier;
            this.Context = Context;
        }
    }
    MBirdSdk.SharedFriendApp = SharedFriendApp;
    class FoundFriendApp {
        constructor(AppIdentifier, Context, EntityIp) {
            this.AppIdentifier = AppIdentifier;
            this.Context = Context;
            this.EntityIp = EntityIp;
        }
    }
    MBirdSdk.FoundFriendApp = FoundFriendApp;
    class Callback {
        constructor(callback) {
            this.callback = callback;
            this.subscriptions = [];
            this.nextId = 0;
        }
        subscribe(callback) {
            var subscription = new Subscription(this.nextId++, callback);
            this.subscriptions[subscription.id] = subscription;
            return subscription.id;
        }
        unSubscribe(id) {
            this.subscriptions[id] = undefined;
        }
        notify(payload) {
            for (var index = 0; index < this.subscriptions.length; index++) {
                if (this.subscriptions[index]) {
                    this.subscriptions[index].callback(payload);
                }
            }
        }
    }
    var NotificationType;
    (function (NotificationType) {
        NotificationType[NotificationType["Message"] = 0] = "Message";
        NotificationType[NotificationType["HtmlFile"] = 1] = "HtmlFile";
        NotificationType[NotificationType["HtmlContent"] = 2] = "HtmlContent";
        NotificationType[NotificationType["WarningMessage"] = 3] = "WarningMessage";
        NotificationType[NotificationType["InfoMessage"] = 4] = "InfoMessage";
    })(NotificationType = MBirdSdk.NotificationType || (MBirdSdk.NotificationType = {}));
    var IOBoardCommandType;
    (function (IOBoardCommandType) {
        IOBoardCommandType[IOBoardCommandType["OpenPrinterDoor"] = 0] = "OpenPrinterDoor";
        IOBoardCommandType[IOBoardCommandType["OpenMaintenanceDoor"] = 1] = "OpenMaintenanceDoor";
        IOBoardCommandType[IOBoardCommandType["OpenAdditionalDoor"] = 2] = "OpenAdditionalDoor";
        IOBoardCommandType[IOBoardCommandType["SetSemaphoreOK"] = 3] = "SetSemaphoreOK";
        IOBoardCommandType[IOBoardCommandType["SetSemaphoreNOK"] = 4] = "SetSemaphoreNOK";
        IOBoardCommandType[IOBoardCommandType["OpenBarrier"] = 5] = "OpenBarrier";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPaymentON"] = 6] = "SetCustomerJourneyPaymentON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPaymentOFF"] = 7] = "SetCustomerJourneyPaymentOFF";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPrinterON"] = 8] = "SetCustomerJourneyPrinterON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyPrinterOFF"] = 9] = "SetCustomerJourneyPrinterOFF";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyScannerON"] = 10] = "SetCustomerJourneyScannerON";
        IOBoardCommandType[IOBoardCommandType["SetCustomerJourneyScannerOFF"] = 11] = "SetCustomerJourneyScannerOFF";
        IOBoardCommandType[IOBoardCommandType["SetBlinkStickOFF"] = 12] = "SetBlinkStickOFF";
        IOBoardCommandType[IOBoardCommandType["SetBlinkStickON"] = 13] = "SetBlinkStickON";
    })(IOBoardCommandType = MBirdSdk.IOBoardCommandType || (MBirdSdk.IOBoardCommandType = {}));
    var UIAlignment;
    (function (UIAlignment) {
        UIAlignment[UIAlignment["TopLeft"] = 0] = "TopLeft";
        UIAlignment[UIAlignment["TopCenter"] = 1] = "TopCenter";
        UIAlignment[UIAlignment["TopRight"] = 2] = "TopRight";
        UIAlignment[UIAlignment["MiddleLeft"] = 3] = "MiddleLeft";
        UIAlignment[UIAlignment["MiddleCenter"] = 4] = "MiddleCenter";
        UIAlignment[UIAlignment["MiddleRight"] = 5] = "MiddleRight";
        UIAlignment[UIAlignment["BottomLeft"] = 6] = "BottomLeft";
        UIAlignment[UIAlignment["BottomCenter"] = 7] = "BottomCenter";
        UIAlignment[UIAlignment["BottomRight"] = 8] = "BottomRight";
        UIAlignment[UIAlignment["Hide"] = 9] = "Hide";
    })(UIAlignment = MBirdSdk.UIAlignment || (MBirdSdk.UIAlignment = {}));
    var RegisteredEventType;
    (function (RegisteredEventType) {
        RegisteredEventType[RegisteredEventType["IOboard_CustomerDetected"] = 0] = "IOboard_CustomerDetected";
        RegisteredEventType[RegisteredEventType["IOboard_KeyAccessUsed"] = 1] = "IOboard_KeyAccessUsed";
        RegisteredEventType[RegisteredEventType["IOboard_AdditionalDoorStateChanged"] = 2] = "IOboard_AdditionalDoorStateChanged";
        RegisteredEventType[RegisteredEventType["IOboard_MaintenanceDoorStateChanged"] = 3] = "IOboard_MaintenanceDoorStateChanged";
        RegisteredEventType[RegisteredEventType["IOboard_PrinterDoorStateChanged"] = 4] = "IOboard_PrinterDoorStateChanged";
        RegisteredEventType[RegisteredEventType["MagReader_DataRead"] = 5] = "MagReader_DataRead";
        RegisteredEventType[RegisteredEventType["Scanner_Scanned"] = 6] = "Scanner_Scanned";
        RegisteredEventType[RegisteredEventType["Kiosk_OutOfWorkingHours_Started"] = 7] = "Kiosk_OutOfWorkingHours_Started";
        RegisteredEventType[RegisteredEventType["Kiosk_OutOfWorkingHours_Ended"] = 8] = "Kiosk_OutOfWorkingHours_Ended";
    })(RegisteredEventType || (RegisteredEventType = {}));
})(MBirdSdk || (MBirdSdk = {}));
