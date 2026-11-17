from schemathesis.cli import schemathesis
from schemathesis.transport.requests import RequestsTransport


send_request = RequestsTransport.send


def send_without_redirects(self, case, **kwargs):
    # Schemathesis 4.4.4 copies before_call kwargs, so changing them in a hook is ineffective.
    # Keep the real HTTP response (including 302) instead of testing the redirect destination.
    kwargs["allow_redirects"] = False
    return send_request(self, case, **kwargs)


if __name__ == "__main__":
    RequestsTransport.send = send_without_redirects
    schemathesis()
