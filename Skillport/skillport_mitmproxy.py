from mitmproxy import http
from mitmproxy.script import concurrent
from pathlib import Path
import re
import random

TAB_SCORE = re.compile(r'sc[=]["]\d?\d?[.]?\d?\d?;\d?\d?[.]?\d?\d?;\d?\d?[.]?\d?\d?["]')
TAB_NOT_SCORED = re.compile(r'sc[=]["][;][;]"')
SCORE = re.compile(r'\bScore[=]\d\d')
TIME = re.compile(r'\bTime[=]\d\d[:]\d\d[:]\d\d\b')
J_SCORE = re.compile(r'j_score[.]\d\d?[=]\d?\d?[.]?\d?\d?')

def change_tab_score():
    score_val = f'{random.randint(81, 100)}'
    return f'sc="{score_val};{score_val};{score_val}"'

@concurrent
def request(flow: http.HTTPFlow) -> None:
    if flow.request.method == "POST":
        if flow.request.pretty_url.endswith("contentRelayer"):
            try:
                if flow.request.urlencoded_form["command"] == "putparam":
                    current_params = flow.request.urlencoded_form["aicc_data"]
                    new_params = current_params.replace('st="i"', 'st="c"')
                    flow.request.urlencoded_form["aicc_data"] = new_params    
            except Exception as err:
                print(repr(err))


@concurrent
def response(flow: http.HTTPFlow) -> None:
    if flow.request.method == "POST":
        if flow.request.pretty_url.endswith("contentRelayer"):
            try:
                if flow.request.urlencoded_form["command"] == "getparam":
                    orig_params = flow.response.get_text()
                    new_params = orig_params.replace('st="i"', 'st="c"')
                    j_scores = re.findall(J_SCORE, new_params)
                    for j_score in j_scores:
                        j_items = j_score.split("=")
                        if int(j_items[1][0:2]) < 81 or j_items[1] == '':
                            j_items[1] = str(random.randint(81, 100))
                        new_jscore = "=".join(j_items)
                        new_params = new_params.replace(j_score, new_jscore)
                    new_params = re.sub(TIME, f"Time=0{random.randint(1,4)}:{random.randint(0,5)}{random.randint(0,9)}:{random.randint(0,5)}{random.randint(0,9)}", new_params)
                    new_params = re.sub(SCORE, f"Score={random.randint(81,100)}", new_params)
                    new_params = new_params.replace("Incomplete", "Completed")
                    new_params = re.sub(TAB_SCORE, change_tab_score(), new_params)
                    flow.response.text = new_params
            except Exception as err:
                print(repr(err))       