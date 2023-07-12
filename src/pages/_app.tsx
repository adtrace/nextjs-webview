import "@/styles/globals.css";
import Script from "next/script";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script id="show-banner">
        {`

        if (window.AdTraceBridge) { // check if webView

          function eventSuccessCallback(eventSuccess) { // just for testing event callback
            alert(
              "Message = " +
                eventSuccess.message +
                "Timestamp = " +
                eventSuccess.timestamp +
                "Adid = " +
                eventSuccess.adid +
                "Event token = " +
                eventSuccess.eventToken
            );
          }

          var script = document.createElement("script");
          script.onload = function () { // loading required as scripts
            let yourAppToken = "{YourAppToken}";
            let environment = AdTraceConfig.EnvironmentSandbox;
            let adtraceConfig = new AdTraceConfig(yourAppToken, environment);

            adtraceConfig.setEventSuccessCallback(eventSuccessCallback); // just for testing event callback

            AdTrace.onCreate(adtraceConfig);
          };
          script.src = "/adtrace_all.js"; // all adtrace scripts including : adtrace.js, adtrace.config.js, adtrace_event.js, adtrace.third_party_sharing.js
          script.async = false;

          document.head.appendChild(script);
        }
        
        `}
      </Script>
    </>
  );
}
