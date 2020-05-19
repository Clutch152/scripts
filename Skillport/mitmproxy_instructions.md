Due to not knowing much javascript, I decided to analyze what the packets look like coming and going from my machine. I found mitmproxy was an easy way to do that, once I figured out what I need to change when my hosts sends a request to the server for its current progress using the 'getparam' in a POST message, I will look at the response coming back from the server, I intercept it's values going to my browser and simply using my vimrc mappings to quickly search and replace some values using mitmproxy's ability to edit content via vim. 


What You Need:
    linux distro
    python3 and mitmproxy installed
    vim with python3 support
        (vim --version should show a +python3 if supported, if not uninstall vim and install vim-gtk)
    attached mitmproxy_vimrc file moved to your home directory as .vimrc

Recommended Setup:
    running linux within vmware player or vmware workstation.

Setup:
    1. Install the Dependencies needed here. Go to https://docs.mitmproxy.org/ for more info if your repo doesn't have mitmproxy

                        apt install python3 python3-mitmproxy vim-gtk

    2. Install the Certificate into your browser as a trusted certificate.

                        Go to https://docs.mitmproxy.org/stable/concepts-certificates/ for instructions

    3. Initialize mitmproxy by simply typing mitmproxy on the commandline. 
    
    4. Download 'mitmproxy_vimrc' from here and rename it to ~/.vimrc.  

                        mv ./mitmproxy_vimrc ~/.vimrc

    5. Set your browser of choice to use a proxy on 127.0.0.1 going to port 8080. All traffic will flow through mitmproxy and you should start seeing the 'flows'

    Using mitmproxy key shortcuts that come in handy here:

                    a - allow intercepted packet to resume traversing the network (potentially after editing it.)

                    z - clear all flows that are in mitmproxy except the ones you've intercepted. 

                    <enter>or<mouseclick> - This will take you into a flow's details (flows contain both the request and response).

                    q - If you are not in a flow, this will ask if you want to quit the whole program, if you are it will break out of the flow and back to the main view.

                    e - This key while in the flow details will pop up a menu asking what you would like to enter. 

                    There are more but these are the most important.
    
    6. Set up your intercept in order to only intercept the packets that you would need to alter. Type while in main view mode the following:

                    ':set intercept=https://library.skillport.com/contentRelayer'

    7. The course will not finish loading until you go to the red text in the main view of mitmproxy. Just click 'a' to allow the packets to continue moving. 
        You will open the course the first time by selecting launch. In here, click on all the contents located in table of contents, and just select 'done' for all of the     tests. The reason for doing this is to populate all of the different lessons and sublessons that will now populate in the 'getparam' response packet you will alter. 
        After you are all done click on 'completion status' tab, take note of the course and what length it is. BEFORE you click exit, allow all current packets that have been intercepted. Now click exit and you should have an intercepted flow, go into the flow with <enter>. 
        
        This is where the 'putparam' packet is, you will want to edit the request content (press 'e' and select option '9'). This will take you into vim and you will have one really really long line. Largely the skillport server ignores most of the data that you send there. But what you can change is the time duration in which you spent on the course. 
        
        Simple way to change that is using a vim substitution in the command line mode and then run a save and quit.

                        :s/time%3D%2200/time%3D%2203/g                  # essentially changes it from 0 hours to 3 hours here. 
                        :wq

        You will be back in flow detail and at this point you can press 'a' to allow the rest of the packets through. The course will close.


    8. Select the Launch button here. You will intercept a flow that has the 'getSkin' parameter in it, you can ignore that and just press 'a' to allow forward. 

        The next flow (or second flow from launch) is the important one here. It will have 'getparam' in the request here, press 'a' to allow the request to go forward. 
        The response is the important peice here, press 'e' and select 'response content'. If you have the .vimrc in the right spot I have mapped the substitution commands in
        the vimrc to be mapped to the <f5> function key. simply press <f5> and <enter> a couple of times. 

        The data has been altered now and you can save and quit out of that vim instance using :wq. I have based these substitutions off of what a completed course looks like. 

        You should be back in the flow view and you can press 'a' here to allow the edited response go through. You're course should now say you have completed everything and all you need to do is press exit and allowing all of the packets to continue through.

    IMPORTANT: You cannot change the date in which you started the course. Open a good amount a week or two before you decide to complete them. 

    Note: This is all fairly new and I'm not quite good at vim patterns (vim's type of regex) For those with suggestions on improving this method, please feel free to fork and
    work on what you need to. 
    
    
    TODO: I will have a picture tutorial here shortly. Also randomly generate the numbers seperately, could update my python3 code within the .vimrc file. 

