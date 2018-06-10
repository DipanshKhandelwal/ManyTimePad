import sys

MSGS = [
    'Hi I am Dipansh Khandelwal',
    'These are orignal sentences',
    'Now we will encrypt these texts',
    'And try to find out the orignal texts',
    'We will also find out the key',
    'This program will help you do this',
    'Just adding new texts',
    'This one is also to add more of them',
    'Just some more lines',
    'Let it be the last line'
]

def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
       return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
       return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def random(size=16):
    return open("/dev/urandom").read(size)

def encrypt(key, msg):
    c = strxor(key, msg)
    print c.encode('hex')
    return c

key = random(1024)
ciphertexts = [encrypt(key, msg) for msg in MSGS]
